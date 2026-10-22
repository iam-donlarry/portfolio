'use client';

import React, { useState } from 'react';
import { SKILL_CATEGORIES, SkillNode } from '@/lib/portfolio-data';
import { 
  FaNetworkWired, 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaCloud, 
  FaShieldAlt, 
  FaCogs, 
  FaCheckCircle 
} from 'react-icons/fa';

interface SkillsDimensionProps {
  onClose: () => void;
}

const CATEGORY_TABS = [
  { key: 'frontend', label: 'Frontend Engineering', icon: <FaCode /> },
  { key: 'backend', label: 'Backend Systems', icon: <FaServer /> },
  { key: 'api_integrations', label: 'APIs & AI Models', icon: <FaNetworkWired /> },
  { key: 'databases', label: 'Databases & Modeling', icon: <FaDatabase /> },
  { key: 'infrastructure', label: 'Infrastructure & DevOps', icon: <FaCloud /> },
  { key: 'security_reliability', label: 'Security & Uptime', icon: <FaShieldAlt /> },
  { key: 'testing_architecture', label: 'Architecture & Standards', icon: <FaCogs /> },
];

export default function SkillsDimension({ onClose }: SkillsDimensionProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('frontend');
  const currentSkills: SkillNode[] = SKILL_CATEGORIES[activeTab] || [];
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(currentSkills[0] || null);

  const handleSelectTab = (key: string) => {
    setActiveTab(key);
    const skills = SKILL_CATEGORIES[key] || [];
    if (skills.length > 0) {
      setSelectedSkill(skills[0]);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto my-auto p-4 sm:p-6 lg:p-8 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#915DFF]/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#915DFF]/15 border border-[#915DFF]/40 flex items-center justify-center text-[#915DFF] text-base shadow-[0_0_15px_rgba(145,93,255,0.3)]">
            <FaNetworkWired />
          </div>
          <div>
            <div className="font-mono text-[10px] text-[#915DFF] tracking-widest uppercase">
              SECTOR: 02 // THE ENGINEERING NETWORK
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-black tracking-tight text-white">
              Technical Capabilities & Architecture
            </h2>
          </div>
        </div>

        <div className="font-mono text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          Verified Systems & Production Stack
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex flex-wrap gap-2 pb-6">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleSelectTab(tab.key)}
              className={`flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#915DFF] text-black border-[#915DFF] font-bold shadow-[0_0_20px_rgba(145,93,255,0.5)]'
                  : 'bg-black/50 text-slate-300 border-[#915DFF]/20 hover:text-white hover:border-[#915DFF]/50'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Connected Nodes & Detailed Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Nodes List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
            Connected Network Nodes:
          </div>
          <div className="space-y-2.5">
            {currentSkills.map((node) => {
              const isSelected = selectedSkill?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedSkill(node)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#915DFF]/20 border-[#915DFF] shadow-[0_0_20px_rgba(145,93,255,0.25)]'
                      : 'bg-black/60 border-white/10 hover:border-[#915DFF]/40 hover:bg-[#915DFF]/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-white text-sm sm:text-base">
                      {node.name}
                    </h4>
                    <span className="font-mono text-[10px] text-black bg-[#915DFF] font-bold px-2.5 py-0.5 rounded-full">
                      {node.level}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-slate-400 mt-1 line-clamp-2">
                    {node.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Node View */}
        {selectedSkill && (
          <div className="lg:col-span-7 p-6 rounded-2xl bg-black/65 border border-[#915DFF]/30 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#915DFF]/20">
              <div>
                <span className="font-mono text-[10px] text-[#915DFF] uppercase tracking-wider">
                  NODE INSPECTION // {selectedSkill.category}
                </span>
                <h3 className="font-display text-2xl font-black text-white mt-1">
                  {selectedSkill.name}
                </h3>
              </div>
              <span className="font-mono text-xs text-black bg-[#915DFF] font-bold px-3 py-1 rounded-full">
                {selectedSkill.level} Tier
              </span>
            </div>

            <div>
              <div className="font-mono text-xs text-[#915DFF] font-semibold uppercase mb-2">
                Production Experience Narrative
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {selectedSkill.description}
              </p>
            </div>

            {/* Core Technologies & Tools */}
            <div>
              <div className="font-mono text-xs text-slate-400 uppercase mb-3">
                Applied Technologies & Frameworks
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSkill.technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-lg bg-[#915DFF]/10 border border-[#915DFF]/30 text-white"
                  >
                    <FaCheckCircle className="text-[#915DFF] text-xs" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Impact statement */}
            <div className="p-4 rounded-xl bg-purple-950/20 border border-[#915DFF]/20">
              <div className="font-mono text-xs text-purple-300 font-bold uppercase mb-1">
                Engineering Standard
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Utilized in real production repositories with comprehensive test coverage, robust typing, and zero runtime performance regressions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
