'use client';

import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS, ProjectDetail } from '@/lib/portfolio-data';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaChevronLeft, 
  FaChevronRight, 
  FaRocket, 
  FaMicrochip, 
  FaCheckCircle, 
  FaLayerGroup,
  FaArrowRight
} from 'react-icons/fa';

interface ProjectsDimensionProps {
  initialProjectId?: string;
  onClose: () => void;
}

export default function ProjectsDimension({
  initialProjectId,
  onClose,
}: ProjectsDimensionProps): React.JSX.Element {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail>(() => {
    if (initialProjectId) {
      const found = PORTFOLIO_PROJECTS.find(
        (p) => p.id === initialProjectId || p.slug === initialProjectId
      );
      if (found) return found;
    }
    return PORTFOLIO_PROJECTS[0];
  });

  const currentIndex = PORTFOLIO_PROJECTS.findIndex((p) => p.id === selectedProject.id);

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length;
    setSelectedProject(PORTFOLIO_PROJECTS[nextIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % PORTFOLIO_PROJECTS.length;
    setSelectedProject(PORTFOLIO_PROJECTS[nextIdx]);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto my-auto p-4 sm:p-6 lg:p-8 animate-fadeIn text-white">
      {/* Top Telemetry & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 text-base shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <FaRocket />
          </div>
          <div>
            <div className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">
              SECTOR: 01 // INDIVIDUAL DIGITAL DIMENSIONS
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-black tracking-tight text-white">
              Engineering Matrix
            </h2>
          </div>
        </div>

        {/* Project Selector Pagination */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            aria-label="Previous Project"
            className="p-2 rounded-lg bg-black/60 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <span className="font-mono text-xs text-slate-300 px-2">
            <strong className="text-cyan-400">{currentIndex + 1}</strong> / {PORTFOLIO_PROJECTS.length}
          </span>
          <button
            onClick={handleNext}
            aria-label="Next Project"
            className="p-2 rounded-lg bg-black/60 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>

      {/* Main Dimension Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Projection & Live Metrics */}
        <div className="lg:col-span-5 space-y-4">
          {/* Holographic Projection Frame */}
          <div className="relative group rounded-2xl overflow-hidden border-2 border-cyan-500/40 bg-black/70 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
            <div className="aspect-video w-full relative overflow-hidden bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/profile-image.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              {/* Holographic Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,240,255,0.03)_50%,transparent_50%)] bg-[length:100%_4px]" />
              
              {/* Badge */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-black bg-cyan-400 px-3 py-1 rounded-full shadow-[0_0_12px_#00f0ff]">
                  {selectedProject.badge}
                </span>
                <span className="font-mono text-[10px] text-cyan-200 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {selectedProject.category}
                </span>
              </div>
            </div>
          </div>

          {/* Quantified Metrics Box */}
          {selectedProject.metrics && (
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/50 border border-cyan-500/20 backdrop-blur-md">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx} className="text-center p-2 rounded-lg bg-cyan-950/20 border border-cyan-500/15">
                  <div className="font-display font-black text-sm text-cyan-300">{m.value}</div>
                  <div className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Action Links */}
          <div className="flex gap-3 pt-1">
            <a
              href={selectedProject.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider bg-cyan-400 text-black hover:bg-cyan-300 hover:shadow-[0_0_20px_#00f0ff] transition-all flex items-center justify-center gap-2 no-underline"
            >
              <span>Launch Live</span>
              <FaExternalLinkAlt className="text-[10px]" />
            </a>

            <a
              href={selectedProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl font-mono text-xs text-slate-300 bg-white/5 border border-cyan-500/30 hover:border-cyan-400 hover:text-white transition-all flex items-center justify-center gap-2 no-underline"
            >
              <FaGithub className="text-sm" />
              <span>Source</span>
            </a>
          </div>

          {/* Quick Mini Switcher */}
          <div className="pt-2">
            <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-2">
              Dimensional Index:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PORTFOLIO_PROJECTS.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`font-mono text-[10px] px-2.5 py-1 rounded border transition-all cursor-pointer ${
                    proj.id === selectedProject.id
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                      : 'bg-black/40 text-slate-400 border-white/10 hover:text-white hover:border-cyan-500/30'
                  }`}
                >
                  {proj.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Deep Dive */}
        <div className="lg:col-span-7 space-y-5 p-5 sm:p-6 rounded-2xl bg-black/60 border border-cyan-500/30 backdrop-blur-xl shadow-2xl max-h-[72vh] overflow-y-auto">
          <div>
            <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1">
              Project Specification
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
              {selectedProject.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mt-2">
              {selectedProject.summary}
            </p>
          </div>

          {/* Problem Statement */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 font-bold uppercase">
              <FaMicrochip className="text-xs" />
              <span>Problem Statement & Challenge</span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {selectedProject.problem}
            </p>
          </div>

          {/* Architecture & Role */}
          <div className="space-y-3">
            <div>
              <div className="font-mono text-xs text-slate-400 uppercase font-semibold">
                Technical Architecture
              </div>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mt-1">
                {selectedProject.architecture}
              </p>
            </div>

            <div>
              <div className="font-mono text-xs text-slate-400 uppercase font-semibold">
                My Role & Contributions
              </div>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mt-1">
                {selectedProject.role}
              </p>
            </div>
          </div>

          {/* Key Decisions */}
          <div>
            <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FaLayerGroup />
              <span>Architectural Decisions & Trade-Offs</span>
            </div>
            <ul className="space-y-2">
              {selectedProject.decisions.map((dec, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <FaCheckCircle className="text-cyan-400 text-xs mt-0.5 shrink-0" />
                  <span>{dec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes & Impact */}
          <div>
            <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FaArrowRight />
              <span>Real Outcomes & Measurable Impact</span>
            </div>
            <ul className="space-y-2">
              {selectedProject.outcomes.map((out, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-3 border-t border-cyan-500/20">
            <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-2">
              Technologies & Frameworks Utilized:
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
