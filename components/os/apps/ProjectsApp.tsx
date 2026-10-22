'use client';

import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  badge: string;
  description: string;
  tags: string[];
  stats: string;
  github: string;
  demo: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'SafetyBuddy',
    category: 'AI / Intelligent',
    image: '/images/porfolio/safetybuddy.png',
    badge: 'AI Emergency Agent',
    description: 'Autonomous first-aid assistant powered by Google Gemini API and Framer Motion, delivering real-time triaged medical guidance and interactive life-saving safety workflows.',
    tags: ['Next.js', 'Gemini API', 'Framer Motion', 'Tailwind CSS'],
    stats: 'Real-time AI Guidance',
    github: 'https://github.com/iam-donlarry/firstaid-chatbot',
    demo: 'https://github.com/iam-donlarry/firstaid-chatbot',
  },
  {
    id: 2,
    title: 'Gesture Connect',
    category: 'AI / Intelligent',
    image: '/images/porfolio/gestureconnect.png',
    badge: 'Computer Vision & AI',
    description: 'Breakthrough accessibility platform utilizing MediaPipe computer vision to translate physical sign language into text and voice synthesis, empowering the deaf & mute community.',
    tags: ['React', 'MediaPipe', 'Web Speech API', 'Computer Vision'],
    stats: 'Vision AI + Speech',
    github: 'https://github.com/iam-donlarry/gestureaid',
    demo: 'https://github.com/iam-donlarry/gestureaid',
  },
  {
    id: 3,
    title: 'Alterverse Production',
    category: 'Web Design',
    image: '/images/porfolio/alterverse.jpeg',
    badge: 'Enterprise Platform',
    description: 'High-scale sustainable agriculture and food manufacturing ecosystem featuring end-to-end commodity showcase, supply-chain narratives, and bespoke corporate UI.',
    tags: ['JavaScript', 'HTML5', 'Modern CSS', 'Bootstrap 5'],
    stats: 'High-Scale Agriculture',
    github: 'https://github.com/iam-donlarry',
    demo: 'https://alterverseproduction.com',
  },
  {
    id: 4,
    title: 'Alterverse Construction',
    category: 'Web Design',
    image: '/images/porfolio/construction.jpeg',
    badge: 'Infrastructure Portal',
    description: 'High-precision infrastructure management and engineering showcase with interactive project blueprints, client testimonials, and immersive project galleries.',
    tags: ['JavaScript', 'Responsive UI', 'Modern CSS', 'Bootstrap'],
    stats: 'Enterprise Infrastructure',
    github: 'https://github.com/iam-donlarry',
    demo: 'https://alterverseconstruction.com',
  },
  {
    id: 5,
    title: 'Al-Barakah Ethical Business',
    category: 'Web Design',
    image: '/images/porfolio/albaraka.jpeg',
    badge: 'Fintech & Ethical Credit',
    description: 'Shariah-compliant Islamic cooperative and ethical credit portal offering automated membership onboarding, asset financing calculator, and transparent services.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    stats: 'Ethical Credit & Fintech',
    github: 'https://github.com/iam-donlarry',
    demo: 'https://albarakaethicalbusinessgroup.com.ng',
  },
  {
    id: 6,
    title: 'Stoke Marine & Shipping',
    category: 'Web Design',
    image: '/images/porfolio/stoke.jpeg',
    badge: 'Maritime Logistics',
    description: 'Global offshore maritime logistics consultancy website showcasing vessel operations, deep-sea freight handling, and worldwide supply-chain infrastructure.',
    tags: ['JavaScript', 'HTML5', 'Bootstrap 5', 'Maritime UI'],
    stats: 'Global Supply Chain',
    github: 'https://github.com/iam-donlarry',
    demo: 'https://stoke-seagroup.com',
  },
  {
    id: 7,
    title: 'NextFlick Cinema App',
    category: 'Mobile App',
    image: '/images/porfolio/movieapp.jpg',
    badge: 'Entertainment Engine',
    description: 'Cinematic streaming explorer providing movie metadata, live ratings, curated trailers, and genre filters with micro-animations optimized for mobile viewing.',
    tags: ['React Native', 'TMDB API', 'Tailwind CSS', 'Mobile'],
    stats: '10k+ Movie Database',
    github: 'https://github.com/iam-donlarry/nextflick',
    demo: 'https://github.com/iam-donlarry/nextflick',
  },
  {
    id: 8,
    title: 'ShelfAlert Inventory',
    category: 'Web App',
    image: '/images/porfolio/shelfalert.png',
    badge: 'Supply Chain Tracker',
    description: 'Predictive inventory tracker alerting enterprises on critical shelf expiration dates to drastically reduce food and pharmaceutical stock wastage.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    stats: 'Automated Expiry Alerts',
    github: 'https://github.com/iam-donlarry/shelfalert',
    demo: 'https://github.com/iam-donlarry/shelfalert',
  },
];

const categories = ['All', 'AI / Intelligent', 'Web Design', 'Web App', 'Mobile App'];

export default function ProjectsApp(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#0B0B16] border border-[#915DFF]/25 rounded-xl">
        {/* Search Input */}
        <div className="relative flex-grow max-w-xs">
          <FaSearch className="absolute left-3 top-3 text-[#915DFF] text-xs" />
          <input
            type="text"
            placeholder="Search projects by name or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/60 border border-[#915DFF]/20 text-white font-mono text-xs focus:outline-none focus:border-[#915DFF]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#915DFF] text-black border-[#915DFF] font-bold shadow-[0_0_12px_#915DFF]'
                    : 'bg-black/40 text-slate-400 border-white/10 hover:text-white hover:border-[#915DFF]/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col rounded-2xl bg-[#0B0B16] border border-[#915DFF]/25 hover:border-[#915DFF] hover:shadow-[0_0_20px_rgba(145,93,255,0.25)] transition-all overflow-hidden"
          >
            {/* Image Preview */}
            <div className="relative w-full h-44 bg-[#05050A] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/profile-image.png';
                }}
              />
              <div className="absolute top-3 left-3 font-mono text-[10px] font-bold text-black bg-[#915DFF] px-2.5 py-0.5 rounded-full">
                {project.badge}
              </div>
              <div className="absolute bottom-2 right-3 font-mono text-[10px] text-white bg-black/80 px-2 py-0.5 rounded border border-[#915DFF]/30">
                {project.stats}
              </div>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-grow space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-white">
                  {project.title}
                </h3>
                <span className="font-mono text-[10px] text-[#915DFF]">
                  {project.category}
                </span>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed flex-grow">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/50 border border-white/10 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-[#915DFF]/15">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-display font-bold text-xs text-[#915DFF] hover:text-white transition-colors no-underline"
                >
                  <span>Launch Live</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-slate-400 hover:text-[#915DFF] transition-colors no-underline"
                >
                  <FaGithub className="text-sm" />
                  <span>Repository</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
