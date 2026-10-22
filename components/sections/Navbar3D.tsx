'use client';

import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar3D(): React.JSX.Element {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Arsenal', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`w-full max-w-5xl rounded-2xl border transition-all duration-300 flex items-center justify-between px-6 py-3 ${
          scrolled
            ? 'bg-[#05050A]/95 backdrop-blur-xl border-[#915DFF]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(145,93,255,0.2)]'
            : 'bg-[#090915]/80 backdrop-blur-md border-[#915DFF]/20 shadow-lg'
        }`}
      >
        {/* Brand */}
        <a href="#about" className="flex items-center gap-2.5 text-white no-underline">
          <div className="w-8 h-8 rounded-lg bg-[#915DFF]/15 border border-[#915DFF]/40 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo2.svg" alt="Logo" className="w-4 h-4 object-contain" />
          </div>
          <span className="font-display font-bold text-sm tracking-tight">Quadri Adekunle</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#915DFF]/15 transition-all no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-xl font-display font-bold text-xs bg-[#915DFF] text-black hover:bg-[#A273FF] hover:shadow-[0_0_15px_#915DFF] transition-all no-underline"
          >
            <FaPaperPlane className="text-[10px]" />
            <span>Connect</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden text-white p-2 rounded-lg bg-white/5 border border-white/10"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 bg-[#090915]/98 border border-[#915DFF]/40 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 z-50">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-slate-200 hover:bg-[#915DFF]/15 hover:text-white font-display text-sm no-underline"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-display font-bold text-xs bg-[#915DFF] text-black no-underline mt-2"
          >
            <FaPaperPlane /> Connect
          </a>
        </div>
      )}
    </header>
  );
}
