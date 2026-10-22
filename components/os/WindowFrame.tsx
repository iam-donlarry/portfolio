'use client';

import React, { useState } from 'react';
import { FaTimes, FaMinus, FaExpand, FaCompress } from 'react-icons/fa';

interface WindowFrameProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  children: React.ReactNode;
  defaultWidth?: string;
  defaultHeight?: string;
}

export default function WindowFrame({
  id,
  title,
  icon,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  children,
  defaultWidth = 'max-w-4xl',
  defaultHeight = 'h-[75vh]',
}: WindowFrameProps): React.JSX.Element {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  return (
    <div
      onClick={onFocus}
      className={`fixed transition-all duration-200 select-none ${
        isMaximized
          ? 'top-9 left-0 right-0 bottom-16 w-full h-[calc(100vh-6.25rem)] z-40'
          : `top-14 md:top-16 left-3 right-3 md:left-auto md:right-auto md:w-full ${defaultWidth} ${defaultHeight} z-30`
      }`}
      style={{
        zIndex: isActive ? 45 : 30,
        margin: isMaximized ? '0' : '0 auto',
      }}
    >
      <div
        className={`w-full h-full rounded-2xl bg-[#080812]/95 backdrop-blur-2xl flex flex-col overflow-hidden transition-all duration-200 ${
          isActive
            ? 'border-2 border-[#915DFF] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(145,93,255,0.35)]'
            : 'border border-[#915DFF]/30 shadow-xl opacity-90'
        }`}
      >
        {/* Title Bar */}
        <div
          onDoubleClick={() => setIsMaximized(!isMaximized)}
          className={`h-11 px-4 flex items-center justify-between border-b transition-colors cursor-move ${
            isActive
              ? 'bg-[#0E0E20] border-[#915DFF]/40 text-white'
              : 'bg-[#0A0A16] border-[#915DFF]/20 text-slate-400'
          }`}
        >
          {/* Window Traffic Light Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              aria-label="Close window"
              className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-[8px] text-black opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <FaTimes />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              aria-label="Minimize window"
              className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center text-[8px] text-black opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <FaMinus />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
              aria-label="Maximize window"
              className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-[8px] text-black opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            >
              {isMaximized ? <FaCompress /> : <FaExpand />}
            </button>
          </div>

          {/* Window Title & Icon */}
          <div className="font-display font-bold text-sm tracking-wide flex items-center gap-2 text-white">
            <span className="text-[#915DFF]">{icon}</span>
            <span>{title}</span>
          </div>

          {/* Status Indicator */}
          <div className="font-mono text-[10px] text-[#915DFF] uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#915DFF] animate-pulse" />
            <span>EXEC</span>
          </div>
        </div>

        {/* Window Content Body */}
        <div className="flex-grow overflow-y-auto p-4 md:p-6 text-white font-sans">
          {children}
        </div>
      </div>
    </div>
  );
}
