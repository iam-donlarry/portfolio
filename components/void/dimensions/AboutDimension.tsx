'use client';

import React from 'react';
import { BIO_DATA } from '@/lib/portfolio-data';
import { 
  FaUserAstronaut, 
  FaFileDownload, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaWhatsapp, 
  FaCheck, 
  FaShieldAlt, 
  FaCode, 
  FaTerminal 
} from 'react-icons/fa';

interface AboutDimensionProps {
  onClose: () => void;
  onNavigateToContact: () => void;
}

export default function AboutDimension({
  onClose,
  onNavigateToContact,
}: AboutDimensionProps): React.JSX.Element {
  return (
    <div className="relative w-full max-w-6xl mx-auto my-auto p-4 sm:p-6 lg:p-8 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-pink-500/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-400/40 flex items-center justify-center text-pink-400 text-base shadow-[0_0_15px_rgba(255,46,147,0.3)]">
            <FaUserAstronaut />
          </div>
          <div>
            <div className="font-mono text-[10px] text-pink-400 tracking-widest uppercase">
              SECTOR: 04 // THE ARCHITECT SANCTUM
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-black tracking-tight text-white">
              Identity & Engineering Philosophy
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-slate-300">Available For Systems Engineering</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Portrait & Key Stats */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border-2 border-pink-500/40 bg-black/70 shadow-[0_0_30px_rgba(255,46,147,0.15)] p-4 text-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl overflow-hidden border border-pink-500/30 relative bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile-image.png"
                alt={BIO_DATA.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            <div className="mt-4">
              <h3 className="font-display font-black text-2xl text-white">
                {BIO_DATA.name}
              </h3>
              <p className="font-mono text-xs text-pink-400 mt-1">
                {BIO_DATA.role}
              </p>
              <p className="font-mono text-[11px] text-slate-400 mt-0.5">
                {BIO_DATA.location}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-2.5 mt-5">
              <a
                href={BIO_DATA.resumeUrl}
                download
                className="flex-1 py-2.5 px-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-pink-500 text-black hover:bg-pink-400 hover:shadow-[0_0_20px_#ff2e93] transition-all flex items-center justify-center gap-2 no-underline"
              >
                <FaFileDownload />
                <span>Resume (PDF)</span>
              </a>

              <button
                onClick={onNavigateToContact}
                className="py-2.5 px-4 rounded-xl font-mono text-xs text-slate-200 bg-white/5 border border-pink-500/30 hover:border-pink-400 hover:text-white transition-all cursor-pointer"
              >
                Direct Comms
              </button>
            </div>

            {/* Socials */}
            <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-white/10">
              {[
                { icon: <FaGithub />, href: BIO_DATA.github, label: 'GitHub' },
                { icon: <FaLinkedin />, href: BIO_DATA.linkedin, label: 'LinkedIn' },
                { icon: <FaTwitter />, href: BIO_DATA.twitter, label: 'Twitter' },
                { icon: <FaWhatsapp />, href: BIO_DATA.whatsappUrl, label: 'WhatsApp' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-black/60 border border-pink-500/30 flex items-center justify-center text-pink-400 hover:bg-pink-500 hover:text-black transition-all no-underline"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {BIO_DATA.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-black/60 border border-pink-500/20 backdrop-blur-md text-center"
              >
                <div className="font-display font-black text-lg text-pink-300">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Engineering Manifesto & Philosophy */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-black/65 border border-pink-500/30 backdrop-blur-xl shadow-2xl space-y-6">
          <div>
            <div className="font-mono text-xs text-pink-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
              <FaTerminal />
              <span>The Architect Manifesto</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
              &quot;I build digital worlds through code.&quot;
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
              {BIO_DATA.philosophy}
            </p>
          </div>

          {/* Core Tenets */}
          <div className="space-y-3">
            <div className="font-mono text-xs text-pink-400 font-bold uppercase tracking-wider">
              Guiding Engineering Principles:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-pink-950/20 border border-pink-500/20 space-y-1">
                <div className="flex items-center gap-2 font-display font-bold text-white text-sm">
                  <FaShieldAlt className="text-pink-400 text-xs" />
                  <span>Zero-Drift Reliability</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Defensive typing, strict sanitization, and structured error boundaries to ensure 99.9% application uptime.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-pink-950/20 border border-pink-500/20 space-y-1">
                <div className="flex items-center gap-2 font-display font-bold text-white text-sm">
                  <FaCode className="text-pink-400 text-xs" />
                  <span>Spatial Empathy</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Interactions should feel alive and responsive, bridging real-time 3D geometry with accessible, semantic DOM content.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-pink-950/20 border border-pink-500/20 space-y-1">
                <div className="flex items-center gap-2 font-display font-bold text-white text-sm">
                  <FaCheck className="text-pink-400 text-xs" />
                  <span>Full-Stack Sovereignty</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Fluent in both low-overhead backends (Node.js, PHP, MySQL) and fluid frontend architectures (React 19, Next.js).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-pink-950/20 border border-pink-500/20 space-y-1">
                <div className="flex items-center gap-2 font-display font-bold text-white text-sm">
                  <FaTerminal className="text-pink-400 text-xs" />
                  <span>Applied Intelligence</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Practical deployment of LLMs and Computer Vision (Gemini API, MediaPipe) to solve real human accessibility problems.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Context Box */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="font-mono text-xs text-slate-300">
              Currently engineering full-scale applications at <strong className="text-pink-400">Baye Business Solutions Limited</strong>. Open to selective contracts, technical architectural advisories, and visionary engineering roles.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
