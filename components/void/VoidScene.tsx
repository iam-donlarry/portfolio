'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export type RealmId = 'nexus' | 'projects' | 'skills' | 'experience' | 'about' | 'contact';

interface RealmConfig {
  id: RealmId;
  name: string;
  subtitle: string;
  color: number;
  hexColor: string;
  position: [number, number, number];
  angle: number;
  texturePath: string;
  radius: number;
  hasRing?: boolean;
  axialTilt: number;
  rotationSpeed: number;
}

export const REALMS: RealmConfig[] = [
  {
    id: 'projects',
    name: 'Projects Dimension',
    subtitle: 'Production Systems & Intelligent Agents',
    color: 0x00f0ff,
    hexColor: '#00f0ff',
    position: [34, 1.5, 0],
    angle: 0,
    texturePath: '/textures/planets/projects_cyan.jpg',
    radius: 2.7,
    hasRing: true,
    axialTilt: 0.25,
    rotationSpeed: 0.006,
  },
  {
    id: 'skills',
    name: 'Engineering Network',
    subtitle: 'Technical Arsenal & Constellations',
    color: 0x915dff,
    hexColor: '#915DFF',
    position: [10.5, 3.5, 32.3],
    angle: (72 * Math.PI) / 180,
    texturePath: '/textures/planets/skills_violet.jpg',
    radius: 2.8,
    hasRing: false,
    axialTilt: 0.4,
    rotationSpeed: 0.008,
  },
  {
    id: 'experience',
    name: 'Chrono Archive',
    subtitle: 'Career Trajectory & Academic Milestones',
    color: 0xffb020,
    hexColor: '#FFB020',
    position: [-27.5, 2.0, 20.0],
    angle: (144 * Math.PI) / 180,
    texturePath: '/textures/planets/experience_amber.jpg',
    radius: 3.1,
    hasRing: true,
    axialTilt: 0.35,
    rotationSpeed: 0.005,
  },
  {
    id: 'about',
    name: 'Architect Sanctum',
    subtitle: 'Engineering Philosophy & Identity',
    color: 0xff2e93,
    hexColor: '#FF2E93',
    position: [-27.5, -2.5, -20.0],
    angle: (216 * Math.PI) / 180,
    texturePath: '/textures/planets/about_magenta.jpg',
    radius: 2.6,
    hasRing: false,
    axialTilt: 0.2,
    rotationSpeed: 0.007,
  },
  {
    id: 'contact',
    name: 'Quantum Transmitter',
    subtitle: 'Direct Communications & Inquiries',
    color: 0x10b981,
    hexColor: '#10B981',
    position: [10.5, -1.0, -32.3],
    angle: (288 * Math.PI) / 180,
    texturePath: '/textures/planets/contact_emerald.jpg',
    radius: 2.7,
    hasRing: false,
    axialTilt: 0.3,
    rotationSpeed: 0.006,
  },
];

interface ShootingStar {
  line: THREE.Line;
  startPos: THREE.Vector3;
  dir: THREE.Vector3;
  progress: number;
  speed: number;
  length: number;
  active: boolean;
  delay: number;
}

interface VoidSceneProps {
  currentRealm: RealmId;
  onSelectRealm: (realm: RealmId) => void;
  isEntered: boolean;
  onEnterVoid: () => void;
}

export default function VoidScene({
  currentRealm,
  onSelectRealm,
  isEntered,
}: VoidSceneProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredRealm, setHoveredRealm] = useState<RealmConfig | null>(null);
  const [isUserDragging, setIsUserDragging] = useState<boolean>(false);

  // Scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const realmMeshesRef = useRef<Map<RealmId, THREE.Group>>(new Map());
  const coreGroupRef = useRef<THREE.Group | null>(null);

  // Orbital Navigation State
  const sphericalRef = useRef({
    radius: 56,
    theta: 0,
    phi: Math.PI / 2.5,
  });

  const targetSphericalRef = useRef({
    radius: 56,
    theta: 0,
    phi: Math.PI / 2.5,
  });

  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAtRef = useRef(new THREE.Vector3(0, 0, 0));

  // Pointer drag state
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    prevX: 0,
    prevY: 0,
    totalDistance: 0,
  });

  // Setup Three.js scene
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040408, 0.008);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1200);
    camera.position.set(0, 8, 56);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x040408, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    const textureLoader = new THREE.TextureLoader();

    // ==========================================
    // 1. LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x202438, 0.85);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xd9b3ff, 4.5, 140, 1.2);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(35, 25, 45);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x4477bb, 0.9);
    rimLight.position.set(-40, -15, -30);
    scene.add(rimLight);

    // ==========================================
    // 2. SOFT CIRCULAR PARTICLE SPRITE (NO SQUARE BOXES!)
    // ==========================================
    const createParticleTexture = (): THREE.Texture => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d')!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    };

    const particleTexture = createParticleTexture();

    // ==========================================
    // 3. DEEP BACKGROUND STAR PARTICLES
    // ==========================================
    const starCount = 3800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0x00f0ff),
      new THREE.Color(0x915dff),
      new THREE.Color(0xffffff),
      new THREE.Color(0x7dd3fc),
      new THREE.Color(0xff2e93),
      new THREE.Color(0xffd166),
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Stars stay strictly in the deep background (120 to 450 units away)
      const radius = 120 + Math.random() * 330;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      starColors[i3] = color.r;
      starColors[i3 + 1] = color.g;
      starColors[i3 + 2] = color.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.75, // Small, delicate pin-point celestial particles
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const starField = new THREE.Points(starGeo, starMaterial);
    scene.add(starField);

    // ==========================================
    // 4. REALISTIC 3D ASTEROID BELT
    // ==========================================
    const asteroidCount = 220;
    const asteroidGeo = new THREE.DodecahedronGeometry(0.3, 1);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: 0x7c7c8c,
      roughness: 0.9,
      metalness: 0.15,
      flatShading: true,
    });

    const asteroidBelt = new THREE.InstancedMesh(asteroidGeo, asteroidMat, asteroidCount);
    const dummy = new THREE.Object3D();
    const asteroidBeltGroup = new THREE.Group();
    asteroidBeltGroup.add(asteroidBelt);
    scene.add(asteroidBeltGroup);

    for (let i = 0; i < asteroidCount; i++) {
      // Ring belt between radius 19 and 23
      const angle = (i / asteroidCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
      const r = 19 + Math.random() * 4.5;
      const y = (Math.random() - 0.5) * 2.2;
      const scale = 0.15 + Math.random() * 0.35;

      dummy.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.scale.set(scale, scale * (0.8 + Math.random() * 0.4), scale);
      dummy.updateMatrix();
      asteroidBelt.setMatrixAt(i, dummy.matrix);
    }
    asteroidBelt.instanceMatrix.needsUpdate = true;

    // ==========================================
    // 5. VERY SMALL SHOOTING STARS / COMETS
    // ==========================================
    const shootingStars: ShootingStar[] = [];
    const shootingStarGroup = new THREE.Group();
    scene.add(shootingStarGroup);

    const initShootingStar = (): ShootingStar => {
      const lineGeo = new THREE.BufferGeometry();
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
      lineGeo.setFromPoints(points);

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(lineGeo, lineMat);
      shootingStarGroup.add(line);

      return {
        line,
        startPos: new THREE.Vector3(),
        dir: new THREE.Vector3(-1, -0.4, -0.6).normalize(),
        progress: 1,
        speed: 0.02 + Math.random() * 0.02,
        length: 8 + Math.random() * 6,
        active: false,
        delay: Math.random() * 3,
      };
    };

    for (let i = 0; i < 4; i++) {
      shootingStars.push(initShootingStar());
    }

    const triggerShootingStar = (star: ShootingStar) => {
      // Spawn high in the celestial hemisphere
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 30;
      star.startPos.set(
        Math.cos(angle) * dist,
        30 + Math.random() * 25,
        Math.sin(angle) * dist
      );

      // Trajectory heading downwards across the sky
      star.dir.set(
        -Math.cos(angle) + (Math.random() - 0.5) * 0.5,
        -0.45 - Math.random() * 0.3,
        -Math.sin(angle) + (Math.random() - 0.5) * 0.5
      ).normalize();

      star.progress = 0;
      star.speed = 0.022 + Math.random() * 0.018;
      star.length = 6 + Math.random() * 7;
      star.active = true;
    };

    // ==========================================
    // 6. REALISTIC CENTRAL SINGULARITY / BLACK HOLE
    // ==========================================
    const coreGroup = new THREE.Group();
    coreGroupRef.current = coreGroup;
    scene.add(coreGroup);

    // Pure black Event Horizon sphere
    const horizonGeo = new THREE.SphereGeometry(3.8, 64, 64);
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    coreGroup.add(horizonMesh);

    // Photon Shell
    const photonGeo = new THREE.SphereGeometry(3.98, 48, 48);
    const photonMat = new THREE.MeshBasicMaterial({
      color: 0x915dff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const photonMesh = new THREE.Mesh(photonGeo, photonMat);
    coreGroup.add(photonMesh);

    // Swirling Accretion Disk
    const accretionDiskTexture = textureLoader.load('/textures/planets/singularity_core.jpg');
    accretionDiskTexture.wrapS = THREE.RepeatWrapping;
    accretionDiskTexture.wrapT = THREE.RepeatWrapping;

    const diskGeo = new THREE.RingGeometry(4.4, 15.5, 96);
    const diskMat = new THREE.MeshBasicMaterial({
      map: accretionDiskTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const accretionDisk = new THREE.Mesh(diskGeo, diskMat);
    accretionDisk.rotation.x = Math.PI / 2.3;
    accretionDisk.rotation.y = Math.PI / 8;
    coreGroup.add(accretionDisk);

    const verticalDiskGeo = new THREE.RingGeometry(4.5, 11.5, 64);
    const verticalDiskMat = new THREE.MeshBasicMaterial({
      map: accretionDiskTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const verticalDisk = new THREE.Mesh(verticalDiskGeo, verticalDiskMat);
    verticalDisk.rotation.y = Math.PI / 2;
    coreGroup.add(verticalDisk);

    // ==========================================
    // 7. FIVE REALISTIC 3D TEXTURED PLANETS
    // ==========================================
    REALMS.forEach((realm) => {
      const planetGroup = new THREE.Group();
      planetGroup.position.set(...realm.position);
      planetGroup.userData = { realmId: realm.id, isRealm: true };

      const planetTexture = textureLoader.load(realm.texturePath);
      planetTexture.wrapS = THREE.RepeatWrapping;
      planetTexture.wrapT = THREE.ClampToEdgeWrapping;

      // Surface Sphere
      const sphereGeo = new THREE.SphereGeometry(realm.radius, 64, 64);
      const planetMat = new THREE.MeshStandardMaterial({
        map: planetTexture,
        roughness: 0.55,
        metalness: 0.15,
        emissive: new THREE.Color(realm.color),
        emissiveIntensity: 0.18,
      });

      const planetMesh = new THREE.Mesh(sphereGeo, planetMat);
      planetMesh.rotation.z = realm.axialTilt;
      planetMesh.userData = { realmId: realm.id };
      planetGroup.add(planetMesh);

      // Atmospheric Glow Shell
      const atmoGeo = new THREE.SphereGeometry(realm.radius * 1.055, 48, 48);
      const atmoMat = new THREE.MeshBasicMaterial({
        color: realm.color,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      });
      const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
      planetGroup.add(atmoMesh);

      // Optional Ring
      if (realm.hasRing) {
        const ringGeo = new THREE.RingGeometry(realm.radius * 1.45, realm.radius * 2.25, 64);
        const ringMat = new THREE.MeshStandardMaterial({
          color: realm.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.5,
          roughness: 0.4,
          metalness: 0.3,
        });
        const planetRing = new THREE.Mesh(ringGeo, ringMat);
        planetRing.rotation.x = Math.PI / 2.2;
        planetGroup.add(planetRing);
      }

      // Orbital Track Guide
      const orbitalTrackRadius = Math.sqrt(realm.position[0] ** 2 + realm.position[2] ** 2);
      const trackGeo = new THREE.RingGeometry(orbitalTrackRadius - 0.05, orbitalTrackRadius + 0.05, 128);
      const trackMat = new THREE.MeshBasicMaterial({
        color: realm.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.09,
        blending: THREE.AdditiveBlending,
      });
      const trackMesh = new THREE.Mesh(trackGeo, trackMat);
      trackMesh.rotation.x = Math.PI / 2;
      trackMesh.position.y = realm.position[1];
      scene.add(trackMesh);

      // Local Point Light
      const planetLight = new THREE.PointLight(realm.color, 1.8, 14);
      planetLight.position.set(0, 0, 0);
      planetGroup.add(planetLight);

      scene.add(planetGroup);
      realmMeshesRef.current.set(realm.id, planetGroup);
    });

    // ==========================================
    // 8. DRAG-TO-ROTATE ORBIT & RAYCAST CONTROLLER
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const checkHover = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouseVector.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const interactables: THREE.Object3D[] = [];
      realmMeshesRef.current.forEach((group) => {
        group.traverse((child) => {
          if (child instanceof THREE.Mesh) interactables.push(child);
        });
      });

      const intersects = raycaster.intersectObjects(interactables);
      if (intersects.length > 0) {
        const top = intersects[0].object;
        const realmId = top.userData?.realmId || top.parent?.userData?.realmId;
        const matched = REALMS.find((r) => r.id === realmId);
        if (matched) {
          setHoveredRealm(matched);
          canvas.style.cursor = dragRef.current.isDown ? 'grabbing' : 'pointer';
          return;
        }
      }
      setHoveredRealm(null);
      canvas.style.cursor = dragRef.current.isDown ? 'grabbing' : 'grab';
    };

    const handlePointerDown = (e: PointerEvent) => {
      dragRef.current.isDown = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;
      dragRef.current.prevX = e.clientX;
      dragRef.current.prevY = e.clientY;
      dragRef.current.totalDistance = 0;
      setIsUserDragging(true);
      canvas.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e: PointerEvent) => {
      checkHover(e.clientX, e.clientY);

      if (!dragRef.current.isDown) return;

      const deltaX = e.clientX - dragRef.current.prevX;
      const deltaY = e.clientY - dragRef.current.prevY;
      dragRef.current.totalDistance += Math.hypot(deltaX, deltaY);

      dragRef.current.prevX = e.clientX;
      dragRef.current.prevY = e.clientY;

      targetSphericalRef.current.theta -= deltaX * 0.0055;

      const minPhi = 0.25;
      const maxPhi = Math.PI / 2 + 0.35;
      targetSphericalRef.current.phi = Math.max(
        minPhi,
        Math.min(maxPhi, targetSphericalRef.current.phi - deltaY * 0.0055)
      );
    };

    const handlePointerUp = (e: PointerEvent) => {
      const wasDrag = dragRef.current.totalDistance > 6;
      dragRef.current.isDown = false;
      setIsUserDragging(false);

      if (!wasDrag) {
        const rect = canvas.getBoundingClientRect();
        mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouseVector, camera);
        const interactables: THREE.Object3D[] = [];
        realmMeshesRef.current.forEach((group) => {
          group.traverse((child) => {
            if (child instanceof THREE.Mesh) interactables.push(child);
          });
        });

        const intersects = raycaster.intersectObjects(interactables);
        if (intersects.length > 0) {
          const top = intersects[0].object;
          const realmId = top.userData?.realmId || top.parent?.userData?.realmId;
          if (realmId) {
            onSelectRealm(realmId as RealmId);
          }
        }
      }

      checkHover(e.clientX, e.clientY);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const minRadius = currentRealm === 'nexus' ? 24 : 7;
      const maxRadius = currentRealm === 'nexus' ? 88 : 28;
      targetSphericalRef.current.radius = Math.max(
        minRadius,
        Math.min(maxRadius, targetSphericalRef.current.radius + e.deltaY * 0.035)
      );
    };

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', handleResize);

    canvas.style.cursor = 'grab';

    // ==========================================
    // 9. ANIMATION LOOP
    // ==========================================
    const startTime = performance.now();

    const animate = () => {
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth camera damping
      sphericalRef.current.theta +=
        (targetSphericalRef.current.theta - sphericalRef.current.theta) * 0.08;
      sphericalRef.current.phi +=
        (targetSphericalRef.current.phi - sphericalRef.current.phi) * 0.08;
      sphericalRef.current.radius +=
        (targetSphericalRef.current.radius - sphericalRef.current.radius) * 0.08;

      lookAtRef.current.lerp(targetLookAtRef.current, 0.08);

      if (camera) {
        const sinPhiRad = sphericalRef.current.radius * Math.sin(sphericalRef.current.phi);
        camera.position.x =
          lookAtRef.current.x + sinPhiRad * Math.sin(sphericalRef.current.theta);
        camera.position.y =
          lookAtRef.current.y + sphericalRef.current.radius * Math.cos(sphericalRef.current.phi);
        camera.position.z =
          lookAtRef.current.z + sinPhiRad * Math.cos(sphericalRef.current.theta);

        camera.lookAt(lookAtRef.current);
      }

      // Rotate Deep Starfield very gently
      if (starField) {
        starField.rotation.y = elapsedTime * 0.006;
      }

      // Orbit Asteroid Belt
      if (asteroidBeltGroup) {
        asteroidBeltGroup.rotation.y = elapsedTime * 0.04;
      }

      // Animate Shooting Stars
      shootingStars.forEach((star) => {
        if (!star.active) {
          star.delay -= 0.016;
          if (star.delay <= 0) {
            triggerShootingStar(star);
          }
        } else {
          star.progress += star.speed;

          const head = star.startPos
            .clone()
            .add(star.dir.clone().multiplyScalar(star.progress * 80));
          const tail = head
            .clone()
            .sub(star.dir.clone().multiplyScalar(star.length));

          const lineGeo = star.line.geometry as THREE.BufferGeometry;
          const posAttr = lineGeo.attributes.position;
          posAttr.setXYZ(0, head.x, head.y, head.z);
          posAttr.setXYZ(1, tail.x, tail.y, tail.z);
          posAttr.needsUpdate = true;

          const mat = star.line.material as THREE.LineBasicMaterial;
          // Fade in then out
          if (star.progress < 0.2) {
            mat.opacity = star.progress * 4.5;
          } else if (star.progress > 0.7) {
            mat.opacity = Math.max(0, (1 - star.progress) * 3.3);
          } else {
            mat.opacity = 0.9;
          }

          if (star.progress >= 1) {
            star.active = false;
            star.delay = 1.5 + Math.random() * 3.5;
            mat.opacity = 0;
          }
        }
      });

      // Rotate Black Hole Accretion Disk
      if (accretionDisk) {
        accretionDisk.rotation.z = elapsedTime * 0.45;
        verticalDisk.rotation.z = -elapsedTime * 0.3;
      }

      // Rotate Planets
      realmMeshesRef.current.forEach((group, id) => {
        const realmConfig = REALMS.find((r) => r.id === id);
        if (!realmConfig) return;

        const floatOffset = Math.sin(elapsedTime * 1.2 + realmConfig.angle) * 0.4;
        group.position.y = realmConfig.position[1] + floatOffset;

        const planetMesh = group.children[0];
        if (planetMesh instanceof THREE.Mesh) {
          planetMesh.rotation.y += realmConfig.rotationSpeed;
        }

        const atmoMesh = group.children[1];
        if (atmoMesh instanceof THREE.Mesh) {
          atmoMesh.rotation.y -= realmConfig.rotationSpeed * 0.4;
        }

        const isHovered = hoveredRealm?.id === id;
        const targetScale = isHovered ? 1.2 : 1.0;
        group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      });

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);

      starGeo.dispose();
      starMaterial.dispose();
      particleTexture.dispose();
      asteroidGeo.dispose();
      asteroidMat.dispose();
      horizonGeo.dispose();
      horizonMat.dispose();
      photonGeo.dispose();
      photonMat.dispose();
      diskGeo.dispose();
      diskMat.dispose();
      verticalDiskGeo.dispose();
      verticalDiskMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Sync Focus / Zoom on Realm Change
  useEffect(() => {
    if (!isEntered) {
      targetLookAtRef.current.set(0, 0, 0);
      gsap.to(targetSphericalRef.current, {
        radius: 64,
        theta: 0,
        phi: Math.PI / 2.3,
        duration: 1.6,
        ease: 'power3.inOut',
      });
      return;
    }

    if (currentRealm === 'nexus') {
      targetLookAtRef.current.set(0, 0, 0);
      gsap.to(targetSphericalRef.current, {
        radius: 54,
        phi: Math.PI / 2.5,
        duration: 1.6,
        ease: 'power3.out',
      });
    } else {
      const targetRealm = REALMS.find((r) => r.id === currentRealm);
      if (targetRealm) {
        const [rx, ry, rz] = targetRealm.position;
        targetLookAtRef.current.set(rx, ry, rz);
        const targetTheta = Math.atan2(rx, rz);

        gsap.to(targetSphericalRef.current, {
          radius: 11.5,
          theta: targetTheta,
          phi: Math.PI / 2.2,
          duration: 1.6,
          ease: 'power3.inOut',
        });
      }
    }
  }, [currentRealm, isEntered]);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />

      {/* Floating 3D Hover Tooltip / Indicator */}
      {hoveredRealm && currentRealm === 'nexus' && isEntered && !isUserDragging && (
        <div
          className="fixed pointer-events-none z-30 transition-all duration-300 transform -translate-x-1/2 -translate-y-12"
          style={{
            left: `${dragRef.current.prevX}px`,
            top: `${dragRef.current.prevY}px`,
          }}
        >
          <div
            className="px-4 py-2 rounded-xl border backdrop-blur-xl bg-black/85 shadow-2xl flex items-center gap-3 animate-fadeIn"
            style={{ borderColor: hoveredRealm.hexColor }}
          >
            <div
              className="w-3 h-3 rounded-full animate-ping"
              style={{ backgroundColor: hoveredRealm.hexColor }}
            />
            <div>
              <div className="font-display font-bold text-xs text-white uppercase tracking-wider">
                {hoveredRealm.name}
              </div>
              <div className="font-mono text-[10px] text-slate-300">
                {hoveredRealm.subtitle}
              </div>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-200">
              CLICK TO EXPLORE
            </span>
          </div>
        </div>
      )}

      {/* Persistent Tactile Mouse Drag Instruction */}
      {isEntered && currentRealm === 'nexus' && (
        <div className="fixed bottom-20 left-0 right-0 flex justify-center pointer-events-none z-20">
          <div className="px-4 py-1.5 rounded-full bg-black/75 border border-white/20 backdrop-blur-md shadow-2xl font-mono text-[11px] text-slate-300 flex items-center gap-2.5">
            <span className="text-cyan-400">❖ Drag mouse to rotate celestial system</span>
            <span className="text-slate-500">•</span>
            <span className="text-purple-300">Scroll to zoom</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-300">Click any planet to inspect</span>
          </div>
        </div>
      )}
    </div>
  );
}
