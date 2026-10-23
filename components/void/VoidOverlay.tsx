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

  const getRealmName = () => {
    if (currentRealm === 'nexus') return 'NEXUS // CORE';
    const found = REALMS.find((r) => r.id === currentRealm);
    return found ? found.name.toUpperCase() : 'UNKNOWN SECTOR';
  };

  const getRealmColor = () => {
    if (currentRealm === 'nexus') return '#915DFF';
    const found = REALMS.find((r) => r.id === currentRealm);
    return found ? found.hexColor : '#915DFF';
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between">
      {/* ========================================================= */}
      {/* 1. THE THRESHOLD & QUANTUM WARP FLIGHT OVERLAY */}
      {/* ========================================================= */}
      {!isEntered && !isWarping && (
        <div className="fixed inset-0 pointer-events-auto bg-black/65 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-50 animate-fadeIn">
          {/* Subtle Ambient Ring */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-purple-500/20 animate-spin-slow pointer-events-none" />
          <div className="absolute w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full border border-cyan-500/10 animate-reverse-spin pointer-events-none" />

          <div className="relative max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2.5 font-mono text-[11px] sm:text-xs text-[#915DFF] bg-[#915DFF]/10 border border-[#915DFF]/30 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(145,93,255,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#915DFF] animate-ping" />
              <span>SPATIAL REALITY PROTOCOL // ONLINE</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
                &quot;I build digital worlds through code.&quot;
              </h1>
              <p className="font-mono text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                <strong className="text-white font-bold">Quadri Adekunle</strong> — Full-Stack Systems Engineer &amp; Spatial Architect.
              </p>
            </div>

            {/* Enter Primary CTA */}
            <div className="pt-4 flex items-center justify-center">
              <button
                onClick={() => {
                  onEnterVoid();
                }}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl font-display font-black text-sm uppercase tracking-widest bg-gradient-to-r from-[#915DFF] via-purple-500 to-cyan-400 text-black hover:opacity-95 hover:shadow-[0_0_35px_#915DFF] transition-all transform hover:scale-105 cursor-pointer flex items-center justify-center gap-3"
              >
                <span>ENTER THE VOID</span>
                <FaRocket className="text-xs" />
              </button>
            </div>

            <div className="font-mono text-[10px] text-slate-500 pt-6">
              WebGL 3D Accelerated • Spatial Audio Enabled • Built inside Next.js
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
                    <span className="text-[#915DFF] font-bold">THE VOID</span> // {getRealmName()}
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
      {/* 4. BOTTOM SPATIAL NAVIGATOR DOCK */}
      {/* ========================================================= */}
      {isEntered && (
        <footer className="w-full pb-3 sm:pb-6 px-2 sm:px-4 flex flex-col items-center gap-2 pointer-events-auto">
          {/* Nexus Celestial Navigation Hint (Placed cleanly above dock, not blocking the Sun) */}
          {currentRealm === 'nexus' && (
            <div className="font-mono text-[10px] sm:text-xs text-slate-300 bg-black/80 border border-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-2xl flex items-center gap-1.5 sm:gap-2 text-center max-w-[94vw] overflow-hidden pointer-events-none animate-pulse">
              <span className="text-cyan-400">❖ Drag to rotate</span>
              <span className="text-slate-500">•</span>
              <span className="hidden sm:inline text-purple-300">Scroll to zoom •</span>
              <span className="text-amber-300 truncate">Tap or click any realm to explore</span>
            </div>
          )}

          <nav
            aria-label="Spatial Sector Navigation"
            className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-black/85 border border-white/15 backdrop-blur-2xl shadow-2xl overflow-x-auto max-w-full no-scrollbar"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Nexus Core Return */}
            <button
              onClick={() => {
                onSelectRealm('nexus');
                voidAudio.playPulse(330);
              }}
              aria-label="Nexus Core"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl font-mono text-[11px] sm:text-xs shrink-0 transition-all cursor-pointer ${
                currentRealm === 'nexus'
                  ? 'bg-white/15 text-white border border-white/30 font-bold shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FaCompass className="text-sm shrink-0" />
              <span className="hidden sm:inline">Nexus</span>
            </button>

            <div className="w-px h-5 bg-white/15 mx-0.5 shrink-0" />

            {/* 1. Projects */}
            <button
              onClick={() => {
                onSelectRealm('projects');
                voidAudio.playPulse(440);
              }}
              aria-label="Projects Dimension"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl font-mono text-[11px] sm:text-xs shrink-0 transition-all cursor-pointer ${
                currentRealm === 'projects'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10'
              }`}
            >
              <FaRocket className="text-cyan-400 text-xs shrink-0" />
              <span>Projects</span>
              <span className="hidden md:inline font-mono text-[9px] text-cyan-400/70">[1]</span>
            </button>

            {/* 2. Skills */}
            <button
              onClick={() => {
                onSelectRealm('skills');
                voidAudio.playPulse(490);
              }}
              aria-label="Engineering Network"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl font-mono text-[11px] sm:text-xs shrink-0 transition-all cursor-pointer ${
                currentRealm === 'skills'
                  ? 'bg-[#915DFF]/20 text-[#915DFF] border border-[#915DFF] font-bold shadow-[0_0_15px_rgba(145,93,255,0.4)]'
                  : 'text-slate-400 hover:text-[#915DFF] hover:bg-[#915DFF]/10'
              }`}
            >
              <FaMicrochip className="text-[#915DFF] text-xs shrink-0" />
              <span>Skills</span>
              <span className="hidden md:inline font-mono text-[9px] text-[#915DFF]/70">[2]</span>
            </button>

            {/* 3. Experience */}
            <button
              onClick={() => {
                onSelectRealm('experience');
                voidAudio.playPulse(550);
              }}
              aria-label="Chrono Archive"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl font-mono text-[11px] sm:text-xs shrink-0 transition-all cursor-pointer ${
                currentRealm === 'experience'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400 font-bold shadow-[0_0_15px_rgba(255,176,32,0.4)]'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <FaHistory className="text-amber-400 text-xs shrink-0" />
              <span>Experience</span>
              <span className="hidden md:inline font-mono text-[9px] text-amber-400/70">[3]</span>
            </button>

            {/* 4. About */}
            <button
              onClick={() => {
                onSelectRealm('about');
                voidAudio.playPulse(587);
              }}
              aria-label="Architect Sanctum"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl font-mono text-[11px] sm:text-xs shrink-0 transition-all cursor-pointer ${
                currentRealm === 'about'
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-400 font-bold shadow-[0_0_15px_rgba(255,46,147,0.4)]'
                  : 'text-slate-400 hover:text-pink-300 hover:bg-pink-500/10'
              }`}
            >
              <FaUserAstronaut className="text-pink-400 text-xs shrink-0" />
              <span>About</span>
              <span className="hidden md:inline font-mono text-[9px] text-pink-400/70">[4]</span>
            </button>

            {/* 5. Contact */}
            <button
              onClick={() => {
                onSelectRealm('contact');
                voidAudio.playPulse(659);
              }}
              aria-label="Quantum Transmitter"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl font-mono text-[11px] sm:text-xs shrink-0 transition-all cursor-pointer ${
                currentRealm === 'contact'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10'
              }`}
            >
              <FaSatelliteDish className="text-emerald-400 text-xs shrink-0" />
              <span>Contact</span>
              <span className="hidden md:inline font-mono text-[9px] text-emerald-400/70">[5]</span>
            </button>
          </nav>
        </footer>
      )}
    </div>
  );
}
