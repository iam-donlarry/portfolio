'use client';

import React from 'react';
import { 
  FaReact, 
  FaNodeJs, 
  FaPhp, 
  FaDatabase, 
  FaGitAlt, 
  FaMobileAlt,
  FaRobot,
  FaLayerGroup
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiMongodb, 
  SiMysql, 
  SiVercel,
  SiFramer
} from 'react-icons/si';

interface SkillItem {
  name: string;
  level: string;
  pct: number;
  icon: React.ReactNode;
}

interface SkillCluster {
  category: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

const skillClusters: SkillCluster[] = [
  {
    category: 'Core Frontend & Interactive UI',
    icon: <FaReact />,
    skills: [
      { name: 'React 18 / 19', level: 'Mastery', pct: 95, icon: <FaReact /> },
      { name: 'Next.js (App Router)', level: 'Mastery', pct: 95, icon: <SiNextdotjs /> },
      { name: 'TypeScript', level: 'Advanced', pct: 90, icon: <SiTypescript /> },
      { name: 'JavaScript (ES6+)', level: 'Expert', pct: 95, icon: <SiJavascript /> },
      { name: 'Framer Motion', level: 'Advanced', pct: 88, icon: <SiFramer /> },
      { name: 'Tailwind CSS', level: 'Mastery', pct: 95, icon: <SiTailwindcss /> },
    ],
  },
  {
    category: 'Backend & Cloud Systems',
    icon: <FaNodeJs />,
    skills: [
      { name: 'Node.js', level: 'Advanced', pct: 88, icon: <FaNodeJs /> },
      { name: 'PHP Ecosystem', level: 'Advanced', pct: 85, icon: <FaPhp /> },
      { name: 'REST APIs & Webhooks', level: 'Mastery', pct: 92, icon: <FaLayerGroup /> },
      { name: 'Next.js Route Handlers', level: 'Mastery', pct: 94, icon: <SiNextdotjs /> },
      { name: 'Vercel Serverless', level: 'Advanced', pct: 90, icon: <SiVercel /> },
    ],
  },
  {
    category: 'Databases & Infrastructure',
    icon: <FaDatabase />,
    skills: [
      { name: 'MongoDB & Mongoose', level: 'Advanced', pct: 85, icon: <SiMongodb /> },
      { name: 'MySQL & Relational Design', level: 'Advanced', pct: 88, icon: <SiMysql /> },
      { name: 'Database Optimization', level: 'Advanced', pct: 84, icon: <FaDatabase /> },
    ],
  },
  {
    category: 'AI Integration & Tooling',
    icon: <FaRobot />,
    skills: [
      { name: 'Google Gemini API', level: 'Production', pct: 90, icon: <FaRobot /> },
      { name: 'MediaPipe Vision AI', level: 'Production', pct: 85, icon: <FaRobot /> },
      { name: 'Git & Version Control', level: 'Mastery', pct: 95, icon: <FaGitAlt /> },
      { name: 'Responsive Architecture', level: 'Mastery', pct: 98, icon: <FaMobileAlt /> },
    ],
  },
];

export default function SkillsApp(): React.JSX.Element {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-4 rounded-xl bg-[#0B0B18] border border-[#915DFF]/30 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#915DFF] text-black font-bold flex items-center justify-center text-sm">
            ARS
          </div>
          <div>
            <div className="text-white font-bold">SYSTEM ARSENAL & TELEMETRY</div>
            <div className="text-slate-400 text-[11px]">4 Core Modules • 18 Production Technologies</div>
          </div>
        </div>
        <div className="px-3 py-1 bg-black/60 border border-[#915DFF]/40 rounded text-[#915DFF]">
          COMPATIBILITY: FULL STACK
        </div>
      </div>

      {/* Cluster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {skillClusters.map((cluster, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#0B0B16] border border-[#915DFF]/20 space-y-4 shadow-lg"
          >
            {/* Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-[#915DFF]/20">
              <div className="w-9 h-9 rounded-xl bg-[#915DFF]/15 border border-[#915DFF]/40 flex items-center justify-center text-lg text-[#915DFF]">
                {cluster.icon}
              </div>
              <h3 className="font-display font-bold text-white text-sm md:text-base">
                {cluster.category}
              </h3>
            </div>

            {/* List */}
            <div className="space-y-3">
              {cluster.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-2 text-white">
                      <span className="text-[#915DFF]">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </span>
                    <span className="text-[#915DFF] font-bold">{skill.level}</span>
                  </div>

                  {/* Solid Bar Gauge (No gradient) */}
                  <div className="w-full h-1.5 rounded-full bg-black/80 overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-[#915DFF]"
                      style={{ width: `${skill.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
