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
  FaLayerGroup,
  FaCheck
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

export default function Skills3D(): React.JSX.Element {
  return (
    <section id="skills" className="py-24 px-4 w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#915DFF] bg-[#915DFF]/10 border border-[#915DFF]/30 px-3 py-1 rounded-full uppercase">
          <span>ARSENAL & PROFICIENCIES</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Technical <span className="text-[#915DFF]">Engineering Matrix</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Production frameworks, backend engines, and database systems utilized to engineer high-velocity software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillClusters.map((cluster, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-[#0B0B14]/90 border border-[#915DFF]/25 hover:border-[#915DFF] transition-all duration-300 shadow-xl space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-[#915DFF]/20">
              <div className="w-10 h-10 rounded-xl bg-[#915DFF]/15 border border-[#915DFF]/40 flex items-center justify-center text-xl text-[#915DFF]">
                {cluster.icon}
              </div>
              <h3 className="font-display font-bold text-white text-base">
                {cluster.category}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cluster.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#915DFF]/40 hover:bg-[#915DFF]/10 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#915DFF] text-base">{skill.icon}</span>
                    <span className="font-sans font-medium text-xs text-white">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#915DFF] bg-[#915DFF]/10 px-2 py-0.5 rounded font-bold">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
