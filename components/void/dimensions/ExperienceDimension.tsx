'use client';

import React, { useState } from 'react';
import { PORTFOLIO_EXPERIENCE, ExperienceMilestone } from '@/lib/portfolio-data';
import { 
  FaHistory, 
  FaBriefcase, 
  FaGraduationCap, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaCheckCircle 
} from 'react-icons/fa';

interface ExperienceDimensionProps {
  onClose: () => void;
}

export default function ExperienceDimension({ onClose }: ExperienceDimensionProps): React.JSX.Element {
  const [selectedMilestone, setSelectedMilestone] = useState<ExperienceMilestone>(
    PORTFOLIO_EXPERIENCE[0]
  );

  return (
    <div className="relative w-full max-w-6xl mx-auto my-auto p-4 sm:p-6 lg:p-8 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-amber-500/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/40 flex items-center justify-center text-amber-400 text-base shadow-[0_0_15px_rgba(255,176,32,0.3)]">
            <FaHistory />
          </div>
          <div>
            <div className="font-mono text-[10px] text-amber-400 tracking-widest uppercase">
              SECTOR: 03 // THE CHRONO ARCHIVE
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-black tracking-tight text-white">
              Experience & Academic Trajectory
            </h2>
          </div>
        </div>

        <div className="font-mono text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full">
          Continuous Engineering Evolution
        </div>
      </div>

      {/* Main Layout: Spatial Timeline & Detailed Milestone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline Path Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-2">
            Chronological Sequence:
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-amber-500/50 before:to-transparent">
            {PORTFOLIO_EXPERIENCE.map((item) => {
              const isSelected = selectedMilestone.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedMilestone(item)}
                  className={`relative p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 shadow-[0_0_20px_rgba(255,176,32,0.25)]'
                      : 'bg-black/60 border-white/10 hover:border-amber-400/40 hover:bg-amber-500/5'
                  }`}
                >
                  {/* Glowing Node Dot on Timeline */}
                  <div
                    className={`absolute -left-[27px] top-5 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                      isSelected
                        ? 'bg-amber-400 border-black shadow-[0_0_12px_#ffb020]'
                        : 'bg-black border-amber-500/50'
                    }`}
                  />

                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[10px] text-black bg-amber-400 font-bold px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1.5">
                      <FaCalendarAlt className="text-amber-400 text-[10px]" />
                      {item.period}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-white text-sm sm:text-base">
                    {item.title}
                  </h4>
                  <div className="font-mono text-xs text-amber-300/80 pt-0.5">
                    {item.organization}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Milestone Inspection */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-black/65 border border-amber-500/30 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center text-lg font-bold">
                {selectedMilestone.type === 'experience' ? <FaBriefcase /> : <FaGraduationCap />}
              </div>
              <div>
                <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider">
                  {selectedMilestone.type.toUpperCase()} MILESTONE
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black text-white mt-0.5">
                  {selectedMilestone.title}
                </h3>
              </div>
            </div>

            <span className="font-mono text-xs text-amber-400 flex items-center gap-1 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full">
              <FaMapMarkerAlt />
              <span>{selectedMilestone.location}</span>
            </span>
          </div>

          <div>
            <div className="font-mono text-xs text-amber-400 font-semibold uppercase mb-1">
              Organization & Context
            </div>
            <div className="font-display font-bold text-white text-base">
              {selectedMilestone.organization}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mt-2">
              {selectedMilestone.summary}
            </p>
          </div>

          {/* Key Contributions / Highlights */}
          <div>
            <div className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider mb-3">
              Key Contributions & Responsibilities
            </div>
            <ul className="space-y-2.5">
              {selectedMilestone.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <FaCheckCircle className="text-amber-400 text-xs mt-1 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack if available */}
          {selectedMilestone.technologies && (
            <div className="pt-4 border-t border-amber-500/20">
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                Tech Stack Involved:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedMilestone.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
