'use client';

import React, { useState, useEffect } from 'react';
import { FaTerminal, FaWifi, FaBatteryFull, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

interface MenuBarProps {
  activeAppTitle: string;
  onOpenApp: (appId: string) => void;
}

export default function MenuBar({ activeAppTitle, onOpenApp }: MenuBarProps): React.JSX.Element {
  const [time, setTime] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [systemMenuOpen, setSystemMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-9 bg-[#07070F]/90 backdrop-blur-md border-b border-[#915DFF]/30 px-3 flex items-center justify-between text-xs font-mono z-50 select-none">
      {/* Left: Brand & Menu Items */}
      <div className="flex items-center gap-3">
        {/* QuadriOS Logo Button */}
        <div className="relative">
          <button
            onClick={() => setSystemMenuOpen(!systemMenuOpen)}
            className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#915DFF]/15 transition-colors cursor-pointer text-white font-bold"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo2.svg" alt="QuadriOS" className="w-4 h-4 object-contain" />
            <span className="font-display tracking-tight text-white">QuadriOS</span>
          </button>

          {/* System Dropdown */}
          {systemMenuOpen && (
            <div className="absolute top-8 left-0 w-56 bg-[#0B0B16] border border-[#915DFF]/40 rounded-lg shadow-2xl p-2 z-50 flex flex-col gap-1 text-slate-200">
              <div className="px-3 py-1.5 font-bold text-white border-b border-[#915DFF]/20 flex items-center justify-between">
                <span>Quadri Adekunle</span>
                <span className="text-[10px] text-[#915DFF]">v2.6</span>
              </div>
              <button
                onClick={() => { onOpenApp('about'); setSystemMenuOpen(false); }}
                className="text-left px-3 py-1.5 hover:bg-[#915DFF] hover:text-black rounded transition-colors"
              >
                About This System
              </button>
              <button
                onClick={() => { onOpenApp('projects'); setSystemMenuOpen(false); }}
                className="text-left px-3 py-1.5 hover:bg-[#915DFF] hover:text-black rounded transition-colors"
              >
                Launch Project Matrix
              </button>
              <button
                onClick={() => { onOpenApp('terminal'); setSystemMenuOpen(false); }}
                className="text-left px-3 py-1.5 hover:bg-[#915DFF] hover:text-black rounded transition-colors"
              >
                Open Terminal.sh
              </button>
              <button
                onClick={() => { onOpenApp('contact'); setSystemMenuOpen(false); }}
                className="text-left px-3 py-1.5 hover:bg-[#915DFF] hover:text-black rounded transition-colors"
              >
                Send Transmission...
              </button>
              <div className="border-t border-[#915DFF]/20 mt-1 pt-1">
                <a
                  href="/documents/Quadri-Resume.pdf"
                  download
                  className="block px-3 py-1.5 text-slate-300 hover:bg-[#915DFF] hover:text-black rounded transition-colors no-underline"
                >
                  Download Dossier (CV)
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Quick Menu Triggers */}
        <div className="hidden sm:flex items-center gap-1 text-slate-400">
          <button onClick={() => onOpenApp('about')} className="px-2 py-0.5 hover:text-white hover:bg-white/5 rounded">System</button>
          <button onClick={() => onOpenApp('projects')} className="px-2 py-0.5 hover:text-white hover:bg-white/5 rounded">Matrix</button>
          <button onClick={() => onOpenApp('skills')} className="px-2 py-0.5 hover:text-white hover:bg-white/5 rounded">Arsenal</button>
          <button onClick={() => onOpenApp('services')} className="px-2 py-0.5 hover:text-white hover:bg-white/5 rounded">Capabilities</button>
          <button onClick={() => onOpenApp('terminal')} className="px-2 py-0.5 hover:text-white hover:bg-white/5 rounded">CLI</button>
        </div>
      </div>

      {/* Center: Active Application */}
      <div className="font-display font-semibold text-white tracking-wide flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#915DFF] shadow-[0_0_8px_#915DFF]" />
        <span>{activeAppTitle || 'Desktop Workspace'}</span>
      </div>

      {/* Right: Telemetry & Clock */}
      <div className="flex items-center gap-3 text-slate-300">
        <div className="hidden md:flex items-center gap-2 px-2 py-0.5 rounded bg-black/40 border border-[#915DFF]/20 text-[10px] text-[#915DFF]">
          <span>STATUS: ONLINE</span>
          <span>•</span>
          <span>FPS: 60</span>
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          aria-label="Toggle sound"
          className="text-slate-400 hover:text-[#915DFF] transition-colors cursor-pointer"
        >
          {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </button>

        <FaWifi className="text-[#915DFF]" title="Latency: 12ms" />
        <FaBatteryFull className="text-[#915DFF]" title="Battery: 100% Infinite" />

        <div className="font-bold text-white px-2 py-0.5 bg-[#915DFF]/15 border border-[#915DFF]/30 rounded">
          {time || '00:00:00'}
        </div>
      </div>
    </div>
  );
}
