'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
    badge: 'Current Mission',
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
    badge: 'Academic Distinction',
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

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00DFD8] bg-[#00DFD8]/10 border border-[#00DFD8]/30 px-3.5 py-1.5 rounded-full mb-4 shadow-[0_0_15px_rgba(0,223,216,0.15)] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00DFD8] animate-pulse" />
            <span>TRAJECTORY // FLIGHT LOG & MILESTONES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Chronicle of <span className="bg-gradient-to-r from-white via-[#CBACF9] to-[#00DFD8] bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            The academic rigor and professional trajectory that forged a full-stack engineer driven by precision and excellence.
          </p>
        </div>

        {/* Conduit */}
        <div className="relative max-w-3xl mx-auto">
          {/* Glowing Conduit Bar */}
          <div className="absolute top-5 bottom-5 left-6 w-0.5 bg-gradient-to-b from-[#00DFD8] via-[#CBACF9] to-[#8A2BE2] shadow-[0_0_10px_rgba(0,223,216,0.4)] z-0" />

          <div className="flex flex-col gap-8">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex items-start gap-6 relative z-10"
              >
                {/* Node Beacon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-black text-lg flex-shrink-0 shadow-lg ${
                    item.type === 'experience'
                      ? 'bg-gradient-to-br from-[#00DFD8] to-[#3B82F6] shadow-cyan-500/30'
                      : 'bg-gradient-to-br from-[#CBACF9] to-[#8A2BE2] shadow-purple-500/30'
                  }`}
                >
                  {item.type === 'experience' ? <FaBriefcase /> : <FaGraduationCap />}
                </div>

                {/* Card */}
                <div className="flex-grow p-6 rounded-3xl bg-[#0d0826]/75 backdrop-blur-xl border border-[#CBACF9]/15 hover:border-[#CBACF9]/35 transition-all duration-300 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                    <span className="font-mono text-xs text-[#00DFD8] bg-[#00DFD8]/10 px-3 py-1 rounded-full border border-[#00DFD8]/20">
                      {item.badge}
                    </span>

                    <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                      <FaCalendarAlt className="text-[10px]" />
                      {item.period}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white mb-1.5">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[#CBACF9] font-display text-sm font-semibold mb-4">
                    <FaBuilding className="text-xs" />
                    {item.entity}
                  </div>

                  <ul className="list-disc pl-5 flex flex-col gap-2 text-slate-300/80 text-sm leading-relaxed">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
