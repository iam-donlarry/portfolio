'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

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
  featured?: boolean;
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
    featured: true,
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
    featured: true,
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

export default function Projects(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00DFD8] bg-[#00DFD8]/10 border border-[#00DFD8]/30 px-3.5 py-1.5 rounded-full mb-4 shadow-[0_0_15px_rgba(0,223,216,0.15)] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00DFD8] animate-pulse" />
            <span>MISSION PORTFOLIO // VERIFIED WORKS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            The <span className="bg-gradient-to-r from-white via-[#CBACF9] to-[#00DFD8] bg-clip-text text-transparent">Project Matrix</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            High-impact web architectures, generative AI implementations, and production systems engineered for maximum performance and unforgettable user engagement.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-display text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-[#00DFD8] bg-gradient-to-r from-[#00DFD8]/20 to-[#8A2BE2]/30 text-white shadow-[0_0_20px_rgba(0,223,216,0.3)]'
                      : 'border-[#CBACF9]/15 bg-[#0d0826]/60 text-slate-400 hover:text-white hover:border-[#CBACF9]/30'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onMouseMove={handleMouseMove}
                className="group relative flex flex-col rounded-3xl bg-[#0d0826]/75 backdrop-blur-xl border border-[#CBACF9]/15 hover:border-[#CBACF9]/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl overflow-hidden"
              >
                {/* Image Frame */}
                <div className="relative w-full h-52 overflow-hidden bg-[#07031e]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/profile-image.png';
                    }}
                  />

                  {/* Gradient Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0826] via-transparent to-transparent pointer-events-none" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-[#07031e]/90 backdrop-blur-md border border-[#00DFD8]/35 px-3 py-1 rounded-full font-mono text-[11px] font-semibold text-[#00DFD8] flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,223,216,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00DFD8]" />
                    {project.badge}
                  </div>

                  {/* Stat Tag */}
                  <div className="absolute bottom-3 right-4 font-mono text-[11px] text-[#CBACF9] bg-[#0d0826]/90 px-2.5 py-1 rounded-md border border-[#CBACF9]/20">
                    {project.stats}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-display font-bold text-xl text-white mb-2.5 tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-slate-300/80 text-sm leading-relaxed mb-5 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#CBACF9]/10">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#00DFD8] hover:text-white font-display text-sm font-semibold transition-all no-underline"
                    >
                      <span>Launch App</span>
                      <FaExternalLinkAlt className="text-xs" />
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View source on GitHub"
                      className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#CBACF9] font-mono text-xs transition-colors no-underline"
                    >
                      <FaGithub className="text-base" />
                      <span>Source</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
