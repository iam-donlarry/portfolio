'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp, FaRocket } from 'react-icons/fa';

interface SocialItem {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export default function Footer(): React.JSX.Element {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks: SocialItem[] = [
    { icon: <FaGithub />, href: 'https://github.com/iam-donlarry', label: 'GitHub' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com/in/adekunle-quadri-920038213', label: 'LinkedIn' },
    { icon: <FaTwitter />, href: 'https://twitter.com/Coredrii', label: 'Twitter' },
    { icon: <FaWhatsapp />, href: 'https://wa.me/2347042277326', label: 'WhatsApp' },
  ];

  return (
    <footer className="relative z-10 border-t border-[#CBACF9]/10 bg-gradient-to-b from-transparent to-[#07031e]/95 pt-16 pb-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-8 mb-10">
          
          {/* Brand */}
          <div>
            <div className="font-display font-black text-2xl text-white mb-2 tracking-tight">
              Quadri Adekunle
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Full-Stack Systems Engineer & UI/UX Architect crafting next-generation digital interfaces from the edge of tomorrow.
            </p>
          </div>

          {/* Socials & Rocket Return */}
          <div className="flex items-center gap-3.5">
            {socialLinks.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-11 h-11 rounded-xl bg-white/5 border border-[#CBACF9]/20 flex items-center justify-center text-[#CBACF9] hover:text-[#00DFD8] hover:border-[#00DFD8] hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,223,216,0.3)] transition-all"
              >
                {s.icon}
              </a>
            ))}

            <button
              onClick={scrollToTop}
              aria-label="Return to orbit"
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#CBACF9]/20 to-[#00DFD8]/20 border border-[#00DFD8]/40 text-[#00DFD8] flex items-center justify-center hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,223,216,0.4)] transition-all cursor-pointer"
            >
              <FaRocket className="text-sm" />
            </button>
          </div>
        </div>

        {/* Telemetry Strip */}
        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div>
            © {currentYear} Quadri Adekunle. Engineered with Next.js, TypeScript & Tailwind CSS.
          </div>

          <div className="flex gap-5">
            <span>SYS: OPTIMAL</span>
            <span>CORE: NEXT 15</span>
            <span>SEC: ENCRYPTED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
