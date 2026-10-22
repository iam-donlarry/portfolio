'use client';

import React from 'react';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaBuilding } from 'react-icons/fa';

interface Milestone {
  type: 'experience' | 'education';
  title: string;
  entity: string;
  period: string;
  badge: string;
  highlights: string[];
}

const milestones: Milestone[] = [
  {
    type: 'experience',
    title: 'Web Developer',
    entity: 'Baye Business Solutions',
    period: '2024 — Present',
    badge: 'Active Role',
    highlights: [
      'Architected highly responsive frontend systems using React, Next.js, and modern CSS frameworks.',
      'Engineered backend route handlers, serverless integrations, and real-time database endpoints.',
      'Reduced initial page load latency and refined Core Web Vitals across mission-critical products.',
      'Enforced code quality, semantic accessibility, and clean design token systems.',
    ],
  },
  {
    type: 'experience',
    title: 'Web Development Intern',
    entity: 'Roystech IT Solutions',
    period: '2017 — 2018',
    badge: 'Foundation',
    highlights: [
      'Developed PHP backend modules and configured optimized MySQL relational database schemas.',
      'Refactored legacy web platforms for cross-browser reliability and mobile fluidity.',
      'Assisted in client discovery and iterative UX/UI wireframing for enterprise clients.',
    ],
  },
  {
    type: 'education',
    title: 'Higher National Diploma (HND) — Computer Science',
    entity: 'Federal Polytechnic Ilaro',
    period: '2018 — 2020',
    badge: 'Distinction',
    highlights: [
      'Advanced specialization in Software Engineering, Algorithmic Analysis, and Distributed Systems.',
      'Architected comprehensive final year project on automated cloud data management.',
    ],
  },
  {
    type: 'education',
    title: 'National Diploma (ND) — Computer Science',
    entity: 'Federal Polytechnic Ilaro',
    period: '2015 — 2017',
    badge: 'Foundation',
    highlights: [
      'Foundational studies in procedural programming, database design, and computer architecture.',
    ],
  },
];

export default function Experience3D(): React.JSX.Element {
  return (
    <section id="experience" className="py-24 px-4 w-full max-w-4xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#915DFF] bg-[#915DFF]/10 border border-[#915DFF]/30 px-3 py-1 rounded-full uppercase">
          <span>CAREER TRAJECTORY</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Experience & <span className="text-[#915DFF]">Education</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          The professional milestones and academic rigor behind my engineering approach.
        </p>
      </div>

      <div className="space-y-6">
        {milestones.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-3xl bg-[#0B0B14]/90 border border-[#915DFF]/25 hover:border-[#915DFF] transition-all space-y-3 shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#915DFF] text-black font-bold flex items-center justify-center text-sm">
                  {item.type === 'experience' ? <FaBriefcase /> : <FaGraduationCap />}
                </span>
                <span className="font-mono text-xs text-black bg-[#915DFF] px-2.5 py-0.5 rounded font-bold">
                  {item.badge}
                </span>
              </div>

              <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                <FaCalendarAlt className="text-[#915DFF]" />
                {item.period}
              </span>
            </div>

            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {item.title}
              </h3>
              <div className="flex items-center gap-1.5 font-mono text-xs text-[#915DFF] pt-0.5">
                <FaBuilding />
                <span>{item.entity}</span>
              </div>
            </div>

            <ul className="list-disc pl-5 space-y-1.5 text-slate-300 text-xs sm:text-sm leading-relaxed">
              {item.highlights.map((h, hIdx) => (
                <li key={hIdx}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
