'use client';

import React from 'react';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
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

export default function Hero3D(): React.JSX.Element {
  return (
    <section id="about" className="min-h-screen w-full flex items-center justify-center pt-28 pb-16 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Col: Text & Information */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#915DFF] bg-[#915DFF]/10 border border-[#915DFF]/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#915DFF] animate-pulse" />
            <span>DYNAMIC WEB & SYSTEMS ARCHITECTURE</span>
          </div>

          <div className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
            <TextGenerateEffect
              words="Transforming Concepts Into Seamless Digital Reality."
              className="text-white font-black"
            />
          </div>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
            Hi, I am <strong className="text-white font-bold">Quadri Adekunle</strong> — a Full-Stack Systems Engineer & UI/UX Architect based in Nigeria. I build resilient, high-performance web applications and intelligent AI interfaces with precision.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-display font-bold text-sm tracking-wide bg-[#915DFF] text-black hover:bg-[#A273FF] hover:shadow-[0_0_25px_#915DFF] transition-all no-underline cursor-pointer"
            >
              <span>Explore My Work</span>
              <FaArrowRight className="text-xs" />
            </a>

            <a
              href="/documents/Quadri-Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-display font-semibold text-sm text-slate-200 bg-white/5 border border-[#915DFF]/30 hover:border-[#915DFF] hover:text-white transition-all no-underline"
            >
              <FaFileDownload className="text-[#915DFF]" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Socials & Status */}
          <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-white/10 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold">AVAILABLE FOR CONTRACTS</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-3">
              {[
                { icon: <FaGithub />, href: 'https://github.com/iam-donlarry' },
                { icon: <FaLinkedin />, href: 'https://linkedin.com/in/adekunle-quadri-920038213' },
                { icon: <FaTwitter />, href: 'https://twitter.com/Coredrii' },
                { icon: <FaWhatsapp />, href: 'https://wa.me/2347042277326' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-[#915DFF]/25 flex items-center justify-center text-[#915DFF] hover:bg-[#915DFF] hover:text-black transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Aceternity 3D Card */}
        <div className="lg:col-span-5 flex justify-center">
          <CardContainer className="inter-var">
            <CardBody className="bg-[#0B0B14]/90 relative group/card border-[#915DFF]/30 w-auto sm:w-[22rem] h-auto rounded-3xl p-6 border shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(145,93,255,0.25)]">
              <CardItem
                translateZ="50"
                className="font-display text-xl font-bold text-white tracking-tight"
              >
                Quadri Adekunle
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-slate-400 text-xs max-w-sm mt-1 font-mono text-[#915DFF]"
              >
                Full Stack Developer & Systems Architect
              </CardItem>
              
              <CardItem translateZ="100" className="w-full mt-4">
                <div className="w-full h-64 rounded-2xl overflow-hidden border-2 border-[#915DFF]/50 relative bg-[#05050A]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/profile-image.png"
                    className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="Quadri Adekunle"
                  />
                </div>
              </CardItem>

              <div className="flex justify-between items-center mt-6">
                <CardItem
                  translateZ={30}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-[#915DFF]/30 font-mono text-[11px] text-white flex items-center gap-1.5"
                >
                  <FaShieldAlt className="text-[#915DFF]" />
                  <span>99.9% Uptime</span>
                </CardItem>
                <CardItem
                  translateZ={40}
                  className="px-3 py-1.5 rounded-lg bg-[#915DFF] text-black font-mono text-[11px] font-bold flex items-center gap-1.5"
                >
                  <FaCode />
                  <span>10+ Deployments</span>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>

      </div>
    </section>
  );
}
