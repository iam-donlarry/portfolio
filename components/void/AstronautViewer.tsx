'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface AstronautViewerProps {
  className?: string;
  onLoaded?: () => void;
}

export default function AstronautViewer({
  className = '',
  onLoaded,
}: AstronautViewerProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 380;
    let height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // 2. Cinematic Cyber-Void Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Light (Warm neutral fill from top front)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    // Cyan Rim Light (Sharp futuristic backlight from top-left)
    const cyanRim = new THREE.DirectionalLight(0x00f0ff, 4.0);
    cyanRim.position.set(-3.5, 3, -2);
    scene.add(cyanRim);

    // Violet Rim Light (Brand accent neon from bottom-right)
    const violetRim = new THREE.DirectionalLight(0x915dff, 4.5);
    violetRim.position.set(3.5, -2.5, -2);
    scene.add(violetRim);

    // Visor Point Light
    const visorLight = new THREE.PointLight(0x915dff, 2.5, 6);
    visorLight.position.set(0, 0.8, 1.8);
    scene.add(visorLight);

    // 3. Parent Pivot Group
    const pivotGroup = new THREE.Group();
    scene.add(pivotGroup);

    // 4. Subtle Ambient Floating Space Motes around Astronaut
    const motesCount = 45;
    const motesGeo = new THREE.BufferGeometry();
    const motesPos = new Float32Array(motesCount * 3);
    for (let i = 0; i < motesCount * 3; i += 3) {
      motesPos[i] = (Math.random() - 0.5) * 4.5;
      motesPos[i + 1] = (Math.random() - 0.5) * 4.5;
      motesPos[i + 2] = (Math.random() - 0.5) * 3.5;
    }
    motesGeo.setAttribute('position', new THREE.BufferAttribute(motesPos, 3));
    const motesMat = new THREE.PointsMaterial({
      color: 0x915dff,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const motesMesh = new THREE.Points(motesGeo, motesMat);
    scene.add(motesMesh);

    // 5. Load GLTF Astronaut Model
    let isDisposed = false;
    let astronautModel: THREE.Object3D | null = null;
    const loader = new GLTFLoader();

    loader.load(
      '/models/astronaut.glb',
      (gltf) => {
        if (isDisposed) return;

        astronautModel = gltf.scene;

        // Auto-center and normalize size
        const box = new THREE.Box3().setFromObject(astronautModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Offset to center
        astronautModel.position.x = -center.x;
        astronautModel.position.y = -center.y;
        astronautModel.position.z = -center.z;

        // Scale to ideal viewport proportion
        const maxDim = Math.max(size.x, size.y, size.z);
        const desiredSize = 2.45;
        const scale = desiredSize / (maxDim || 1);
        pivotGroup.scale.set(scale, scale, scale);

        // Enhance material specular reflections
        astronautModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              const mat = child.material as THREE.MeshStandardMaterial;
              mat.envMapIntensity = 1.4;
              mat.needsUpdate = true;
            }
          }
        });

        pivotGroup.add(astronautModel);
        setIsLoading(false);
        onLoaded?.();
      },
      undefined,
      (err) => {
        console.error('Failed to load 3D astronaut model:', err);
        if (!isDisposed) {
          setIsLoading(false);
          setHasError(true);
        }
      }
    );

    // 6. Interactive Mouse & Drag Controls
    const mouseRef = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const dragRef = {
      isDragging: false,
      prevX: 0,
      prevY: 0,
      extraRotX: 0,
      extraRotY: 0,
    };

    const handlePointerMove = (e: MouseEvent) => {
      // Calculate normalized mouse coords (-1 to +1) relative to window
      mouseRef.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (dragRef.isDragging) {
        const deltaX = e.clientX - dragRef.prevX;
        const deltaY = e.clientY - dragRef.prevY;
        dragRef.extraRotY += deltaX * 0.008;
        dragRef.extraRotX += deltaY * 0.008;
        dragRef.prevX = e.clientX;
        dragRef.prevY = e.clientY;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      dragRef.isDragging = true;
      dragRef.prevX = e.clientX;
      dragRef.prevY = e.clientY;
      canvas.style.cursor = 'grabbing';
    };

    const handlePointerUp = () => {
      dragRef.isDragging = false;
      canvas.style.cursor = 'grab';
    };

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 380;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('resize', handleResize);
    canvas.style.cursor = 'grab';

    // 7. Render Loop
    let animationId: number;
    let baseRotationY = 0.25;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth cursor lerp
      mouseRef.x += (mouseRef.targetX - mouseRef.x) * 0.06;
      mouseRef.y += (mouseRef.targetY - mouseRef.y) * 0.06;

      // Natural Zero-Gravity Floating Oscillations
      const floatY = Math.sin(elapsedTime * 1.3) * 0.12;
      const floatX = Math.cos(elapsedTime * 0.85) * 0.05;
      const floatTiltZ = Math.sin(elapsedTime * 0.9) * 0.06;

      pivotGroup.position.y = floatY;
      pivotGroup.position.x = floatX;

      // Gentle continuous rotation when not dragging
      if (!dragRef.isDragging) {
        baseRotationY += 0.004;
      }

      // Combine base rotation, drag rotation, and mouse tracking
      pivotGroup.rotation.y = baseRotationY + dragRef.extraRotY + mouseRef.x * 0.55;
      pivotGroup.rotation.x = dragRef.extraRotX - mouseRef.y * 0.45;
      pivotGroup.rotation.z = floatTiltZ;

      // Subtle motes animation
      motesMesh.rotation.y = elapsedTime * 0.04;
      motesMesh.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      // Visor light breath
      visorLight.intensity = 2.2 + Math.sin(elapsedTime * 2.5) * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      motesGeo.dispose();
      motesMat.dispose();

      if (astronautModel) {
        astronautModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else if (child.material) {
              child.material.dispose();
            }
          }
        });
      }

      renderer.dispose();
    };
  }, [onLoaded]);

  if (hasError) {
    return <></>;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
    >
      {/* Loading state indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
          <div className="w-8 h-8 rounded-full border-2 border-[#915DFF] border-t-transparent animate-spin" />
          <span className="font-mono text-[10px] text-[#915DFF] tracking-widest uppercase">
            CALIBRATING SPATIAL PILOT...
          </span>
        </div>
      )}

      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-700 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        aria-label="Interactive 3D Astronaut Pilot"
      />

      {/* Subtle Drag Hint */}
      {!isLoading && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 pointer-events-none font-mono text-[9px] text-slate-400/80 bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10 whitespace-nowrap hidden sm:block">
          ❖ Drag to rotate astronaut
        </div>
      )}
    </div>
  );
}

