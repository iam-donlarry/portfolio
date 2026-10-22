'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaWhatsapp, 
  FaArrowRight, 
  FaFileDownload,
  FaShieldAlt,
  FaCode
} from 'react-icons/fa';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export default function Hero(): React.JSX.Element {
  const socialLinks: SocialLink[] = [
    { icon: <FaGithub />, href: 'https://github.com/iam-donlarry', label: 'GitHub' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com/in/adekunle-quadri-920038213', label: 'LinkedIn' },
    { icon: <FaTwitter />, href: 'https://twitter.com/Coredrii', label: 'Twitter' },
    { icon: <FaWhatsapp />, href: 'https://wa.me/2347042277326', label: 'WhatsApp' },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center pt-32 pb-20 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Mission Briefing & Kinetic Typography */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Holographic Status Pill */}
            <div className="inline-flex items-center gap-2.5 font-mono text-xs tracking-widest text-[#00DFD8] bg-[#00DFD8]/10 border border-[#00DFD8]/30 px-3.5 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(0,223,216,0.15)] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00DFD8] shadow-[0_0_8px_#00DFD8] animate-pulse" />
              <span>ORBITAL SECTOR // FULL STACK ARCHITECT</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight mb-6 text-white">
              Crafting <span className="bg-gradient-to-r from-white via-[#CBACF9] to-[#00DFD8] bg-clip-text text-transparent">Extraordinary</span> Digital Realities.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300/80 leading-relaxed mb-8 max-w-xl">
              I am <strong className="text-white font-semibold">Quadri Adekunle</strong> — a systems developer & UI/UX visionary engineering hyper-performant web applications, intelligent systems, and immersive cosmic interfaces.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-display font-bold text-sm tracking-wide text-black bg-gradient-to-r from-[#CBACF9] via-[#8A2BE2] to-[#00DFD8] hover:shadow-[0_0_30px_rgba(0,223,216,0.4)] hover:scale-105 transition-all no-underline"
              >
                <span>Explore Matrix</span>
                <FaArrowRight className="text-xs" />
              </a>

              <a
                href="/documents/Quadri-Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-display font-medium text-sm text-white bg-white/5 border border-[#CBACF9]/30 hover:border-[#00DFD8] hover:text-[#00DFD8] hover:bg-[#CBACF9]/10 transition-all no-underline"
              >
                <FaFileDownload className="text-xs" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Social Coordinates */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs tracking-wider text-slate-400 uppercase">
                Coordinates:
              </span>
              <div className="flex gap-2.5">
                {socialLinks.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-[#CBACF9]/20 flex items-center justify-center text-[#CBACF9] hover:text-[#00DFD8] hover:border-[#00DFD8] hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,223,216,0.3)] transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Holographic Avatar & Orbital Rings */}
          <motion.div
            className="lg:col-span-5 flex justify-center items-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer Orbital Rotating Ring */}
            <div className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full border border-dashed border-[#CBACF9]/25 animate-[spin_30s_linear_infinite] pointer-events-none">
              <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-[#00DFD8] shadow-[0_0_12px_#00DFD8]" />
            </div>

            {/* Inner Counter-Rotating Ring */}
            <div className="absolute w-72 sm:w-80 h-72 sm:h-80 rounded-full border border-dotted border-[#00DFD8]/30 animate-[spin_20s_linear_infinite_reverse] pointer-events-none">
              <div className="absolute -bottom-1.5 right-1/4 w-2.5 h-2.5 rounded-full bg-[#CBACF9] shadow-[0_0_10px_#CBACF9]" />
            </div>

            {/* Avatar Frame */}
            <div className="relative w-64 sm:w-72 h-64 sm:h-72 rounded-3xl p-3 bg-gradient-to-br from-[#CBACF9]/15 to-[#07031e]/90 border border-[#CBACF9]/35 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(138,43,226,0.3)]">
              <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#0a081d]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/profile-image.png"
                  alt="Quadri Adekunle"
                  className="w-full h-full object-cover contrast-105 hover:scale-105 transition-transform duration-500"
                />
                
                {/* Holographic Scanline Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00DFD8]/5 to-transparent bg-[length:100%_6px] pointer-events-none" />
              </div>

              {/* Floating Orbit Stat Chip 1 - Top Right */}
              <div className="absolute -top-4 -right-4 bg-[#07031e]/95 backdrop-blur-xl border border-[#00DFD8]/40 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 z-10">
                <div className="w-7 h-7 rounded-lg bg-[#00DFD8]/15 flex items-center justify-center text-[#00DFD8] text-xs">
                  <FaShieldAlt />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-slate-400 uppercase">Reliability</div>
                  <div className="font-display font-bold text-xs text-white">99.9% Uptime</div>
                </div>
              </div>

              {/* Floating Orbit Stat Chip 2 - Bottom Left */}
              <div className="absolute -bottom-4 -left-4 bg-[#07031e]/95 backdrop-blur-xl border border-[#CBACF9]/40 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 z-10">
                <div className="w-7 h-7 rounded-lg bg-[#CBACF9]/15 flex items-center justify-center text-[#CBACF9] text-xs">
                  <FaCode />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-slate-400 uppercase">Deployments</div>
                  <div className="font-display font-bold text-xs text-white">10+ Production</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
