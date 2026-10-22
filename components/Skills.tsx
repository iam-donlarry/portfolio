'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
  icon: React.ReactNode;
}

interface SkillCluster {
  category: string;
  icon: React.ReactNode;
  color: string;
  skills: SkillItem[];
}

const skillClusters: SkillCluster[] = [
  {
    category: 'Core Frontend & Immersive UI',
    icon: <FaReact />,
    color: '#00DFD8',
    skills: [
      { name: 'React 18 / 19', level: 'Mastery', icon: <FaReact /> },
      { name: 'Next.js (App Router)', level: 'Mastery', icon: <SiNextdotjs /> },
      { name: 'TypeScript', level: 'Advanced', icon: <SiTypescript /> },
      { name: 'JavaScript (ES6+)', level: 'Expert', icon: <SiJavascript /> },
      { name: 'Framer Motion', level: 'Advanced', icon: <SiFramer /> },
      { name: 'Tailwind CSS', level: 'Mastery', icon: <SiTailwindcss /> },
    ],
  },
  {
    category: 'Backend & Cloud Systems',
    icon: <FaNodeJs />,
    color: '#CBACF9',
    skills: [
      { name: 'Node.js', level: 'Advanced', icon: <FaNodeJs /> },
      { name: 'PHP Ecosystem', level: 'Advanced', icon: <FaPhp /> },
      { name: 'REST APIs & Webhooks', level: 'Mastery', icon: <FaLayerGroup /> },
      { name: 'Next.js Route Handlers', level: 'Mastery', icon: <SiNextdotjs /> },
      { name: 'Vercel Serverless', level: 'Advanced', icon: <SiVercel /> },
    ],
  },
  {
    category: 'Databases & Infrastructure',
    icon: <FaDatabase />,
    color: '#38BDF8',
    skills: [
      { name: 'MongoDB & Mongoose', level: 'Advanced', icon: <SiMongodb /> },
      { name: 'MySQL & Relational Design', level: 'Advanced', icon: <SiMysql /> },
      { name: 'Database Optimization', level: 'Advanced', icon: <FaDatabase /> },
    ],
  },
  {
    category: 'AI Integration & Tooling',
    icon: <FaRobot />,
    color: '#FF007A',
    skills: [
      { name: 'Google Gemini API', level: 'Production', icon: <FaRobot /> },
      { name: 'MediaPipe Vision AI', level: 'Production', icon: <FaRobot /> },
      { name: 'Git & Version Control', level: 'Mastery', icon: <FaGitAlt /> },
      { name: 'Responsive Architecture', level: 'Mastery', icon: <FaMobileAlt /> },
    ],
  },
];

export default function Skills(): React.JSX.Element {
  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00DFD8] bg-[#00DFD8]/10 border border-[#00DFD8]/30 px-3.5 py-1.5 rounded-full mb-4 shadow-[0_0_15px_rgba(0,223,216,0.15)] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00DFD8] animate-pulse" />
            <span>ARSENAL // TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            The <span className="bg-gradient-to-r from-white via-[#CBACF9] to-[#00DFD8] bg-clip-text text-transparent">Cybernetic Stack</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Battle-tested engineering frameworks, reactive state architectures, and robust cloud services utilized to power production-ready digital products.
          </p>
        </div>

        {/* Skill Clusters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillClusters.map((cluster, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-3xl bg-[#0d0826]/75 backdrop-blur-xl border border-[#CBACF9]/15 hover:border-[#CBACF9]/35 hover:-translate-y-1 transition-all duration-300 shadow-xl flex flex-col"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#CBACF9]/10">
                <div
                  className="w-10 h-10 rounded-xl bg-white/5 border flex items-center justify-center text-lg"
                  style={{ color: cluster.color, borderColor: `${cluster.color}40` }}
                >
                  {cluster.icon}
                </div>
                <h3 className="font-display font-bold text-base text-white">
                  {cluster.category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-col gap-2.5">
                {cluster.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-[#CBACF9]/10 hover:border-[#CBACF9]/30 hover:translate-x-1 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm" style={{ color: cluster.color }}>
                        {skill.icon}
                      </span>
                      <span className="text-sm font-medium text-white">
                        {skill.name}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-[#00DFD8] bg-[#00DFD8]/10 px-2 py-0.5 rounded-full border border-[#00DFD8]/20">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
