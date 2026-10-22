'use client';

import React from 'react';
import { 
  FaUserAstronaut, 
  FaRocket, 
  FaMicrochip, 
  FaCogs, 
  FaHistory, 
  FaPaperPlane, 
  FaTerminal, 
  FaFilePdf 
} from 'react-icons/fa';

interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action?: () => void;
}

interface DockProps {
  openApps: string[];
  activeAppId: string;
  onOpenApp: (appId: string) => void;
}

export default function Dock({ openApps, activeAppId, onOpenApp }: DockProps): React.JSX.Element {
  const dockItems: DockItem[] = [
    { id: 'about', label: 'Briefing.sys', icon: <FaUserAstronaut /> },
    { id: 'projects', label: 'Matrix.app', icon: <FaRocket /> },
    { id: 'skills', label: 'Arsenal.app', icon: <FaMicrochip /> },
    { id: 'services', label: 'Capabilities.sys', icon: <FaCogs /> },
    { id: 'experience', label: 'FlightLog.log', icon: <FaHistory /> },
    { id: 'terminal', label: 'Terminal.sh', icon: <FaTerminal /> },
    { id: 'contact', label: 'Comms.deck', icon: <FaPaperPlane /> },
    { 
      id: 'cv', 
      label: 'Dossier.pdf', 
      icon: <FaFilePdf />, 
      action: () => {
        const link = document.createElement('a');
        link.href = '/documents/Quadri-Resume.pdf';
        link.download = 'Quadri-Resume.pdf';
        link.click();
      }
    },
  ];

  return (
    <div className="fixed bottom-3 left-0 right-0 flex justify-center z-50 pointer-events-none select-none">
      <div className="pointer-events-auto bg-[#07070F]/90 backdrop-blur-2xl border border-[#915DFF]/40 rounded-2xl px-3 py-2 flex items-center gap-2 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(145,93,255,0.25)]">
        {dockItems.map((item) => {
          const isOpen = openApps.includes(item.id);
          const isActive = activeAppId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  onOpenApp(item.id);
                }
              }}
              title={item.label}
              className={`group relative w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#915DFF] text-black shadow-[0_0_20px_#915DFF] -translate-y-2'
                  : 'bg-white/5 text-slate-300 hover:text-white hover:bg-[#915DFF]/25 hover:border-[#915DFF] hover:-translate-y-1.5'
              } border border-[#915DFF]/25`}
            >
              {item.icon}

              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-[#915DFF]/50 text-white font-mono text-[10px] px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap">
                {item.label}
              </div>

              {/* Running App Pip */}
              {isOpen && !isActive && (
                <span className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#915DFF] shadow-[0_0_6px_#915DFF]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
