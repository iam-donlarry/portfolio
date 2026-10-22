'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp, FaArrowUp } from 'react-icons/fa';

export default function Footer3D(): React.JSX.Element {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#915DFF]/20 bg-[#05050A] py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="font-display font-bold text-xl text-white">
            Quadri Adekunle
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Full-Stack Systems Engineer & UI/UX Architect.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon: <FaGithub />, href: 'https://github.com/iam-donlarry' },
            { icon: <FaLinkedin />, href: 'https://linkedin.com/in/adekunle-quadri-920038213' },
            { icon: <FaTwitter />, href: 'https://twitter.com/Coredrii' },
            { icon: <FaWhatsapp />, href: 'https://wa.me/2347042277326' },
          ].map((s, idx) => (
            <a
              key={idx}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/5 border border-[#915DFF]/25 flex items-center justify-center text-[#915DFF] hover:bg-[#915DFF] hover:text-black transition-colors"
            >
              {s.icon}
            </a>
          ))}

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-9 h-9 rounded-xl bg-[#915DFF] text-black font-bold flex items-center justify-center hover:bg-[#A273FF] hover:shadow-[0_0_15px_#915DFF] transition-all cursor-pointer"
          >
            <FaArrowUp className="text-xs" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
        <div>© {currentYear} Quadri Adekunle. All rights reserved.</div>
        <div>Built with Next.js 15, Aceternity 3D & Tailwind CSS.</div>
      </div>
    </footer>
  );
}
