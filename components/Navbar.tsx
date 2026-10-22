'use client';

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPaperPlane } from 'react-icons/fa';

interface NavbarProps {
  activeSection?: string;
}

interface NavItem {
  id: string;
  label: string;
}

export default function Navbar({ activeSection = 'about' }: NavbarProps): React.JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { id: 'about', label: 'Orbit' },
    { id: 'projects', label: 'Matrix' },
    { id: 'skills', label: 'Arsenal' },
    { id: 'services', label: 'Capabilities' },
    { id: 'experience', label: 'Flight Log' },
    { id: 'contact', label: 'Terminal' },
  ];

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300">
      <nav
        className={`w-full max-w-5xl flex items-center justify-between rounded-full border transition-all duration-300 ${
          scrolled
            ? 'py-2.5 px-6 bg-[#07031e]/90 backdrop-blur-2xl border-[#CBACF9]/25 shadow-2xl shadow-purple-950/40'
            : 'py-3 px-7 bg-[#0d0826]/70 backdrop-blur-xl border-[#CBACF9]/15 shadow-xl'
        }`}
      >
        {/* Brand Logo & Telemetry */}
        <a
          href="#about"
          className="flex items-center gap-3 text-white no-underline group"
        >
          <div className="relative w-9 h-9 rounded-full flex items-center justify-center bg-radial from-[#CBACF9]/20 to-[#00DFD8]/10 border border-[#CBACF9]/30 shadow-[0_0_15px_rgba(203,172,249,0.25)] group-hover:scale-105 transition-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo2.svg"
              alt="Quadri Adekunle Logo"
              className="w-5 h-5 object-contain"
            />
          </div>
          <div>
            <div className="font-display font-bold text-sm md:text-base leading-tight tracking-tight">
              Quadri Adekunle
            </div>
            <div className="font-mono text-[10px] tracking-wider text-[#00DFD8] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse inline-block" />
              SYSTEM ONLINE
            </div>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`font-display text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 no-underline ${
                  isActive
                    ? 'text-white bg-[#CBACF9]/15 border border-[#CBACF9]/35 shadow-[0_0_15px_rgba(203,172,249,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full font-display font-semibold text-xs tracking-wider text-black bg-gradient-to-r from-[#CBACF9] via-[#8A2BE2] to-[#00DFD8] hover:shadow-[0_0_20px_rgba(0,223,216,0.4)] hover:scale-105 transition-all no-underline"
          >
            <FaPaperPlane className="text-[10px]" />
            <span>Transmit</span>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-[#CBACF9]/20 text-white hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 bg-[#07031e]/95 backdrop-blur-2xl border border-[#CBACF9]/25 rounded-2xl p-5 shadow-2xl flex flex-col gap-2 z-50 animate-in fade-in zoom-in-95">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileOpen(false)}
              className={`font-display text-base font-medium px-4 py-2.5 rounded-xl transition-colors no-underline ${
                activeSection === item.id
                  ? 'text-[#00DFD8] bg-[#00DFD8]/10 border border-[#00DFD8]/30'
                  : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl font-display font-bold text-sm text-black bg-gradient-to-r from-[#CBACF9] to-[#00DFD8] no-underline"
          >
            <FaPaperPlane /> Initiate Transmission
          </a>
        </div>
      )}
    </header>
  );
}
