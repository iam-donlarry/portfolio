'use client';

import React, { useEffect, useState } from 'react';
import { RealmId, REALMS } from './VoidScene';
import ProjectsDimension from './dimensions/ProjectsDimension';
import SkillsDimension from './dimensions/SkillsDimension';
import ExperienceDimension from './dimensions/ExperienceDimension';
import AboutDimension from './dimensions/AboutDimension';
import ContactDimension from './dimensions/ContactDimension';
import { voidAudio } from './VoidAudio';
import { 
  FaVolumeUp, 
  FaVolumeMute, 
  FaFileDownload, 
  FaCompass, 
  FaArrowLeft, 
  FaKeyboard,
  FaRocket,
  FaMicrochip,
  FaHistory,
  FaUserAstronaut,
  FaSatelliteDish,
  FaTimes
} from 'react-icons/fa';
import { FloatingDock, FloatingDockItem } from '@/components/ui/floating-dock';
import AstronautViewer from './AstronautViewer';

interface VoidOverlayProps {
  currentRealm: RealmId;
  onSelectRealm: (realm: RealmId) => void;
  isEntered: boolean;
  onEnterVoid: () => void;
  onExitVoid?: () => void;
  initialProjectId?: string;
  isWarping?: boolean;
}

export default function VoidOverlay({
  currentRealm,
  onSelectRealm,
  isEntered,
  onEnterVoid,
  onExitVoid,
  initialProjectId,
  isWarping = false,
}: VoidOverlayProps): React.JSX.Element {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showKeyHints, setShowKeyHints] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If typing in an input or textarea, skip keyboard navigation
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')
      ) {
        return;
      }

      if (e.key === 'Escape' || e.key === '0') {
        if (currentRealm !== 'nexus') {
          onSelectRealm('nexus');
          voidAudio.playPulse(330);
        } else if (onExitVoid) {
          onExitVoid();
          voidAudio.playPulse(330);
        }
      } else if (e.key === '1') {
        onSelectRealm('projects');
        voidAudio.playPulse(440);
      } else if (e.key === '2') {
        onSelectRealm('skills');
        voidAudio.playPulse(490);
      } else if (e.key === '3') {
        onSelectRealm('experience');
        voidAudio.playPulse(550);
      } else if (e.key === '4') {
        onSelectRealm('about');
        voidAudio.playPulse(587);
      } else if (e.key === '5') {
        onSelectRealm('contact');
        voidAudio.playPulse(659);
      } else if (e.key.toLowerCase() === 'm') {
        const nextState = voidAudio.toggle();
        setIsPlayingAudio(nextState);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRealm, onSelectRealm]);

  const handleToggleAudio = () => {
    const nextState = voidAudio.toggle();
    setIsPlayingAudio(nextState);
  };


  // Aceternity Floating Dock items with realm-specific neon accents
  const dockItems: FloatingDockItem[] = [
    {
      title: 'Nexus Core [ESC]',
      icon: <FaCompass className="text-lg" />,
      onClick: () => {
        onSelectRealm('nexus');
        voidAudio.playPulse(330);
      },
      isActive: currentRealm === 'nexus',
      color: '#ffffff',
    },
    {
      title: 'Projects Dimension [1]',
      icon: <FaRocket className="text-lg" />,
      onClick: () => {
        onSelectRealm('projects');
        voidAudio.playPulse(440);
      },
      isActive: currentRealm === 'projects',
      color: '#00f0ff',
    },
    {
      title: 'Engineering Arsenal [2]',
      icon: <FaMicrochip className="text-lg" />,
      onClick: () => {
        onSelectRealm('skills');
        voidAudio.playPulse(490);
      },
      isActive: currentRealm === 'skills',
      color: '#915dff',
    },
    {
      title: 'Chrono Archive [3]',
      icon: <FaHistory className="text-lg" />,
      onClick: () => {
        onSelectRealm('experience');
        voidAudio.playPulse(550);
      },
      isActive: currentRealm === 'experience',
      color: '#ffb020',
    },
    {
      title: 'Architect Sanctum [4]',
      icon: <FaUserAstronaut className="text-lg" />,
      onClick: () => {
        onSelectRealm('about');
        voidAudio.playPulse(587);
      },
      isActive: currentRealm === 'about',
      color: '#ff2e93',
    },
    {
      title: 'Quantum Transmitter [5]',
      icon: <FaSatelliteDish className="text-lg" />,
      onClick: () => {
        onSelectRealm('contact');
        voidAudio.playPulse(659);
      },
      isActive: currentRealm === 'contact',
      color: '#10b981',
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between">
      {/* ========================================================= */}
      {/* 1. THE THRESHOLD & QUANTUM WARP FLIGHT OVERLAY */}
      {/* ========================================================= */}
      {!isEntered && !isWarping && (
        <div className="fixed inset-0 pointer-events-auto bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 z-50 animate-fadeIn overflow-y-auto">
          {/* Subtle Ambient Rings in Background */}
          <div className="absolute w-80 h-80 sm:w-[32rem] sm:h-[32rem] rounded-full border border-purple-500/15 animate-spin-slow pointer-events-none" />
          <div className="absolute w-96 h-96 sm:w-[38rem] sm:h-[38rem] rounded-full border border-cyan-500/10 animate-reverse-spin pointer-events-none" />

          {/* Main Content: Two-column on desktop, stacked on mobile */}
          <div className="relative max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center justify-center gap-6 lg:gap-12 my-auto">
            {/* Left Column: Mission Briefing & CTA */}
            <div className="flex-1 max-w-xl text-center lg:text-left space-y-5">
              <div className="inline-flex items-center gap-2.5 font-mono text-[10px] sm:text-xs text-[#915DFF] bg-[#915DFF]/10 border border-[#915DFF]/30 px-3.5 sm:px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(145,93,255,0.25)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#915DFF] animate-ping" />
                <span>SPATIAL REALITY PROTOCOL // ONLINE</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
                  &quot;I build digital worlds through code.&quot;
                </h1>
                <p className="font-mono text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  <strong className="text-white font-bold">Quadri Adekunle</strong> — Full-Stack Systems Engineer &amp; Spatial Architect.
                </p>
              </div>

              {/* Enter Primary CTA */}
              <div className="pt-2 flex items-center justify-center lg:justify-start">
                <button
                  onClick={() => {
                    onEnterVoid();
                  }}
                  className="w-full sm:w-auto px-9 py-3.5 sm:py-4 rounded-2xl font-display font-black text-xs sm:text-sm uppercase tracking-widest bg-[#915DFF] text-white hover:bg-[#7e44f8] hover:shadow-[0_0_35px_#915DFF] transition-all transform hover:scale-105 cursor-pointer flex items-center justify-center gap-3"
                >
                  <span>ENTER THE VOID</span>
                  <FaRocket className="text-xs" />
                </button>
              </div>

              <div className="font-mono text-[9px] sm:text-[10px] text-slate-400/80 pt-1">
                WebGL 3D Accelerated • Spatial Audio Enabled
              </div>
            </div>

            {/* Right Column: Interactive 3D Astronaut Pilot */}
            <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[440px] lg:h-[480px] shrink-0 relative flex items-center justify-center">
              {/* Radial glow aura behind astronaut */}
              <div className="absolute inset-2 sm:inset-4 rounded-full bg-gradient-to-tr from-[#915DFF]/25 via-cyan-500/15 to-transparent blur-3xl pointer-events-none" />
              <AstronautViewer className="w-full h-full" />
            </div>
          </div>
        </div>
      )}

      {/* Cinematic Warp Flight HUD during travel */}
      {isWarping && (
        <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center p-6 z-50 animate-fadeIn">
          {/* Radial Warp Speed Vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#915DFF]/15 to-cyan-500/25 backdrop-blur-[2px] animate-pulse" />

          {/* Central Cockpit Flight Telemetry Card */}
          <div className="relative flex flex-col items-center max-w-md w-full p-6 sm:p-8 rounded-3xl bg-black/80 border border-cyan-400/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,240,255,0.4)] text-center space-y-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/50 text-[10px] sm:text-xs font-mono tracking-widest text-cyan-300 uppercase shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              <FaRocket className="text-xs text-cyan-400 animate-bounce" />
              <span>QUANTUM WARP DRIVE ENGAGED</span>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-[11px] sm:text-xs text-slate-400 uppercase tracking-widest">
                VELOCITY // ACCELERATING TO SUBLIGHT
              </div>
              <div className="font-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-[#915DFF] tracking-tight">
                0.99<span className="text-2xl text-cyan-400 font-mono">c</span>
              </div>
            </div>

            {/* Kinetic Warp Acceleration Bar */}
            <div className="w-full bg-black/90 rounded-full h-2.5 overflow-hidden border border-white/20 p-0.5 shadow-inner">
              <div className="h-full bg-gradient-to-r from-cyan-400 via-[#915DFF] to-pink-500 rounded-full animate-warpProgress shadow-[0_0_20px_#00f0ff]" />
            </div>

            <div className="flex items-center justify-between w-full font-mono text-[10px] sm:text-[11px] text-slate-300 pt-1">
              <span className="text-cyan-400 font-bold">VECTOR: SECTOR 00</span>
              <span className="text-purple-300 animate-pulse font-bold">ORBITAL INSERTION...</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. THE TOP TELEMETRY HUD BAR */}
      {/* ========================================================= */}
      {isEntered && (
        <header className="w-full p-4 sm:p-6 flex items-center justify-between pointer-events-auto">
          {/* Top-Left: System Monitor & Realm Return */}
          <div className="flex items-center gap-3">
            {currentRealm !== 'nexus' ? (
              <button
                onClick={() => {
                  onSelectRealm('nexus');
                  voidAudio.playPulse(330);
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/70 border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider backdrop-blur-md shadow-xl transition-all cursor-pointer group"
              >
                <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
                <span>Return to Nexus</span>
                <span className="hidden sm:inline font-mono text-[10px] text-slate-400 bg-white/10 px-1.5 py-0.5 rounded">
                  ESC
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="px-3.5 py-2 rounded-xl bg-black/70 border border-[#915DFF]/40 backdrop-blur-md shadow-xl flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#915DFF] animate-pulse" />
                  <div className="font-mono text-xs text-slate-200">
                    <span className="text-[#915DFF] font-bold">THE VOID</span>
                  </div>
                </div>

                {onExitVoid && (
                  <button
                    onClick={() => {
                      onExitVoid();
                      voidAudio.playPulse(330);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/70 border border-white/20 hover:border-white text-slate-300 hover:text-white font-mono text-xs transition-all backdrop-blur-md shadow-xl cursor-pointer group"
                    title="Exit Void and return to Threshold (ESC)"
                  >
                    <FaArrowLeft className="text-[10px] group-hover:-translate-x-0.5 transition-transform" />
                    <span>Exit Void</span>
                    <span className="hidden sm:inline font-mono text-[9px] text-slate-400 bg-white/10 px-1 py-0.5 rounded">
                      ESC
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Top-Right: Sound, CV, and Key Hints */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              aria-label={isPlayingAudio ? 'Mute Ambient Sound' : 'Play Ambient Sound'}
              className="p-2.5 rounded-xl bg-black/70 border border-white/15 text-slate-300 hover:text-white hover:border-white/40 transition-all backdrop-blur-md cursor-pointer"
              title="Toggle Atmospheric Audio (M)"
            >
              {isPlayingAudio ? (
                <FaVolumeUp className="text-sm text-cyan-400" />
              ) : (
                <FaVolumeMute className="text-sm" />
              )}
            </button>

            {/* Keyboard Shortcuts Info */}
            <button
              onClick={() => setShowKeyHints(!showKeyHints)}
              aria-label="Keyboard Shortcuts"
              className="p-2.5 rounded-xl bg-black/70 border border-white/15 text-slate-300 hover:text-white hover:border-white/40 transition-all backdrop-blur-md cursor-pointer hidden sm:block"
              title="Keyboard Shortcuts"
            >
              <FaKeyboard className="text-sm" />
            </button>

            {/* Resume PDF Download */}
            <a
              href="/documents/Quadri-Resume.pdf"
              download
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/70 border border-white/15 hover:border-white text-slate-200 hover:text-white font-mono text-xs transition-all backdrop-blur-md no-underline"
            >
              <FaFileDownload className="text-xs text-[#915DFF]" />
              <span className="hidden sm:inline">Resume</span>
            </a>
          </div>
        </header>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showKeyHints && (
        <div className="fixed inset-0 pointer-events-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="p-6 rounded-2xl bg-black/90 border border-white/20 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-display font-bold text-white text-sm">Spatial Hotkeys</h3>
              <button
                onClick={() => setShowKeyHints(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-300">
                <span>[1] Projects Dimension</span>
                <span className="text-cyan-400 font-bold">Key 1</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>[2] Engineering Network (Skills)</span>
                <span className="text-[#915DFF] font-bold">Key 2</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>[3] Chrono Archive (Experience)</span>
                <span className="text-amber-400 font-bold">Key 3</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>[4] Architect Sanctum (About)</span>
                <span className="text-pink-400 font-bold">Key 4</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>[5] Quantum Transmitter (Contact)</span>
                <span className="text-emerald-400 font-bold">Key 5</span>
              </div>
              <div className="flex justify-between text-slate-300 pt-2 border-t border-white/10">
                <span>[ESC] Return to Nexus</span>
                <span className="text-white font-bold">ESC</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>[M] Toggle Sound Generator</span>
                <span className="text-white font-bold">Key M</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. CENTRAL ACTIVE DIMENSION VIEW */}
      {/* ========================================================= */}
      {isEntered && currentRealm !== 'nexus' && (
        <main className="w-full flex-1 overflow-y-auto pointer-events-auto flex items-center justify-center px-4 py-2">
          {currentRealm === 'projects' && (
            <ProjectsDimension
              initialProjectId={initialProjectId}
              onClose={() => onSelectRealm('nexus')}
            />
          )}

          {currentRealm === 'skills' && (
            <SkillsDimension onClose={() => onSelectRealm('nexus')} />
          )}

          {currentRealm === 'experience' && (
            <ExperienceDimension onClose={() => onSelectRealm('nexus')} />
          )}

          {currentRealm === 'about' && (
            <AboutDimension
              onClose={() => onSelectRealm('nexus')}
              onNavigateToContact={() => onSelectRealm('contact')}
            />
          )}

          {currentRealm === 'contact' && (
            <ContactDimension onClose={() => onSelectRealm('nexus')} />
          )}
        </main>
      )}

      {/* ========================================================= */}
      {/* 4. BOTTOM SPATIAL NAVIGATOR DOCK (ACETERNITY FLOATING DOCK) */}
      {/* ========================================================= */}
      {isEntered && (
        <footer className="w-full pb-3 sm:pb-5 px-2 sm:px-4 flex flex-col items-center gap-2 pointer-events-auto">
          {/* Nexus Celestial Navigation Hint */}
          {currentRealm === 'nexus' && (
            <div className="font-mono text-[10px] sm:text-xs text-slate-300 bg-black/80 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-2xl flex items-center gap-1.5 sm:gap-2 text-center max-w-[94vw] overflow-hidden pointer-events-none animate-pulse mb-16 md:mb-0">
              <span className="text-cyan-400">❖ Drag to rotate</span>
              <span className="text-slate-500">•</span>
              <span className="hidden sm:inline text-purple-300">Scroll to zoom •</span>
              <span className="text-amber-300 truncate">Tap or click any realm</span>
            </div>
          )}

          {/* Aceternity Dynamic Spring Magnification Floating Dock */}
          <FloatingDock items={dockItems} />
        </footer>
      )}
    </div>
  );
}
