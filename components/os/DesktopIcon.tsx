'use client';

import React from 'react';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  onOpen: (id: string) => void;
  badge?: string;
}

export default function DesktopIcon({ id, label, icon, onOpen, badge }: DesktopIconProps): React.JSX.Element {
  return (
    <button
      onDoubleClick={() => onOpen(id)}
      onClick={() => onOpen(id)}
      className="group flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-[#915DFF]/15 border border-transparent hover:border-[#915DFF]/30 transition-all text-center w-24 cursor-pointer select-none"
    >
      <div className="relative w-13 h-13 rounded-2xl bg-[#0B0B18]/85 border border-[#915DFF]/30 flex items-center justify-center text-2xl text-[#915DFF] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(145,93,255,0.4)] group-hover:bg-[#915DFF]/20 transition-all">
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1 font-mono text-[9px] bg-[#915DFF] text-black px-1.5 py-0.2 rounded-full font-bold">
            {badge}
          </span>
        )}
      </div>
      <span className="font-mono text-xs text-slate-200 group-hover:text-white group-hover:drop-shadow-[0_0_8px_#915DFF] leading-tight break-all">
        {label}
      </span>
    </button>
  );
}
