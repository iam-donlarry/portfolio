'use client';

import React, { useState } from 'react';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { FaGithub, FaExternalLinkAlt, FaRocket } from 'react-icons/fa';

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

export default function Projects3D(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-4 w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#915DFF] bg-[#915DFF]/10 border border-[#915DFF]/30 px-3 py-1 rounded-full uppercase">
          <FaRocket className="text-xs" />
          <span>PROVEN SYSTEMS & APPS</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Featured <span className="text-[#915DFF]">3D Projects</span> Matrix
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Interactive 3D project cards showcasing full-stack systems, computer vision models, and production platforms. Hover over any card to experience perspective depth.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs px-4 py-1.5 rounded-full border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#915DFF] text-black border-[#915DFF] font-bold shadow-[0_0_15px_#915DFF]'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-[#915DFF]/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <CardContainer key={project.id} className="inter-var w-full">
            <CardBody className="bg-[#0B0B14]/90 relative group/card border-[#915DFF]/25 hover:border-[#915DFF] w-full h-auto rounded-3xl p-5 border shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <CardItem
                  translateZ="30"
                  className="font-mono text-[11px] font-bold text-black bg-[#915DFF] px-2.5 py-0.5 rounded-full"
                >
                  {project.badge}
                </CardItem>
                <CardItem
                  translateZ="30"
                  className="font-mono text-[10px] text-slate-400"
                >
                  {project.category}
                </CardItem>
              </div>

              <CardItem
                translateZ="50"
                className="font-display text-lg font-bold text-white tracking-tight"
              >
                {project.title}
              </CardItem>

              <CardItem
                as="p"
                translateZ="40"
                className="text-slate-300 text-xs mt-2 leading-relaxed min-h-[48px]"
              >
                {project.description}
              </CardItem>

              <CardItem translateZ="80" className="w-full mt-4">
                <div className="w-full h-44 rounded-xl overflow-hidden border border-[#915DFF]/30 bg-[#05050A]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/profile-image.png';
                    }}
                  />
                </div>
              </CardItem>

              {/* Tags */}
              <CardItem translateZ="30" className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/60 border border-white/10 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </CardItem>

              {/* Actions */}
              <div className="flex justify-between items-center mt-5 pt-3 border-t border-white/10">
                <CardItem
                  translateZ={30}
                  as="a"
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-display font-bold text-[#915DFF] hover:text-white transition-colors no-underline"
                >
                  <span>Launch Live</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </CardItem>

                <CardItem
                  translateZ={30}
                  as="a"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-[#915DFF] transition-colors no-underline"
                >
                  <FaGithub className="text-sm" />
                  <span>Repository</span>
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  );
}
