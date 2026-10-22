'use client';

import React from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaWhatsapp, 
  FaFileDownload, 
  FaPaperPlane,
  FaShieldAlt,
  FaCode,
  FaGraduationCap,
  FaBuilding
} from 'react-icons/fa';

interface AboutAppProps {
  onOpenApp: (appId: string) => void;
}

export default function AboutApp({ onOpenApp }: AboutAppProps): React.JSX.Element {
  return (
    <div className="space-y-6">
      {/* Top Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#0C0C1C] border border-[#915DFF]/30 rounded-2xl p-6">
        {/* Profile Avatar Frame */}
        <div className="md:col-span-4 flex justify-center">
          <div className="relative w-44 h-44 rounded-2xl overflow-hidden border-2 border-[#915DFF] shadow-[0_0_25px_rgba(145,93,255,0.4)] bg-[#05050A]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/profile-image.png"
              alt="Quadri Adekunle"
              className="w-full h-full object-cover contrast-105"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md border border-[#915DFF]/40 rounded px-2 py-0.5 text-center font-mono text-[10px] text-[#915DFF] font-bold">
              SYSTEM PILOT
            </div>
          </div>
        </div>

        {/* Bio Highlights */}
        <div className="md:col-span-8 space-y-3">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#915DFF] bg-[#915DFF]/10 border border-[#915DFF]/30 px-3 py-1 rounded-full uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#915DFF] animate-pulse" />
            <span>FULL STACK ENGINEER & SYSTEMS ARCHITECT</span>
          </div>

          <h1 className="font-display text-3xl font-black text-white tracking-tight">
            Quadri Adekunle
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Full-Stack Systems Developer & UI/UX Artisan specializing in architecting bulletproof web applications, high-performance API engines, and intelligent AI-augmented interfaces.
          </p>

          {/* Key Stat Badges */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-[#915DFF]/30 font-mono text-xs">
              <FaShieldAlt className="text-[#915DFF]" />
              <span className="text-white font-bold">99.9% Uptime Mindset</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-[#915DFF]/30 font-mono text-xs">
              <FaCode className="text-[#915DFF]" />
              <span className="text-white font-bold">10+ Production Deployments</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-[#915DFF]/30 font-mono text-xs">
              <FaBuilding className="text-[#915DFF]" />
              <span className="text-slate-300">Baye Business Solutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launch & Dossier Download Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-black/40 border border-[#915DFF]/20">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenApp('projects')}
            className="px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-[#915DFF] text-black hover:bg-[#A273FF] hover:shadow-[0_0_20px_#915DFF] transition-all cursor-pointer"
          >
            Launch Project Matrix
          </button>
          <button
            onClick={() => onOpenApp('contact')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-display font-medium text-xs text-white bg-white/5 border border-[#915DFF]/40 hover:bg-[#915DFF]/15 transition-all cursor-pointer"
          >
            <FaPaperPlane className="text-[#915DFF]" />
            <span>Send Transmission</span>
          </button>
          <a
            href="/documents/Quadri-Resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-display font-medium text-xs text-slate-300 bg-white/5 border border-white/10 hover:text-white hover:border-[#915DFF] transition-all no-underline"
          >
            <FaFileDownload className="text-[#915DFF]" />
            <span>Download CV (.pdf)</span>
          </a>
        </div>

        {/* Social Coordinates */}
        <div className="flex items-center gap-2">
          {[
            { icon: <FaGithub />, href: 'https://github.com/iam-donlarry', label: 'GitHub' },
            { icon: <FaLinkedin />, href: 'https://linkedin.com/in/adekunle-quadri-920038213', label: 'LinkedIn' },
            { icon: <FaTwitter />, href: 'https://twitter.com/Coredrii', label: 'Twitter' },
            { icon: <FaWhatsapp />, href: 'https://wa.me/2347042277326', label: 'WhatsApp' },
          ].map((s, idx) => (
            <a
              key={idx}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-8 h-8 rounded-lg bg-white/5 border border-[#915DFF]/30 flex items-center justify-center text-[#915DFF] hover:bg-[#915DFF] hover:text-black transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Core Philosophy & Academic Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[#0A0A16] border border-[#915DFF]/20 space-y-2">
          <div className="font-mono text-xs text-[#915DFF] uppercase font-bold flex items-center gap-2">
            <FaGraduationCap />
            <span>Academic Rigor</span>
          </div>
          <div className="font-display font-bold text-white text-sm">
            Higher National Diploma (HND) & ND — Computer Science
          </div>
          <div className="text-slate-400 text-xs">
            Federal Polytechnic Ilaro • Specialization in Web Architecture, Systems Analysis & Distributed Software Design.
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0A0A16] border border-[#915DFF]/20 space-y-2">
          <div className="font-mono text-xs text-[#915DFF] uppercase font-bold flex items-center gap-2">
            <FaBuilding />
            <span>Current Mission</span>
          </div>
          <div className="font-display font-bold text-white text-sm">
            Web Developer @ Baye Business Solutions
          </div>
          <div className="text-slate-400 text-xs">
            Engineering robust client portals, responsive user interfaces, optimized backend API endpoints, and real-time database workflows.
          </div>
        </div>
      </div>
    </div>
  );
}
