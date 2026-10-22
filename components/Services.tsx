'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaLaptopCode, 
  FaMobileAlt, 
  FaServer, 
  FaDatabase, 
  FaRocket,
  FaRobot
} from 'react-icons/fa';

interface ServiceItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: 1,
    icon: <FaLaptopCode />,
    title: 'High-Performance Web Architecture',
    description: 'Engineering bulletproof, lightning-fast web applications with Next.js App Router, React 19, and Server-Side Pre-Rendering for peak conversion.',
    color: '#00DFD8',
    features: ['Next.js App Router', 'Sub-second Latency', 'SEO Best Practices'],
  },
  {
    id: 2,
    icon: <FaMobileAlt />,
    title: 'UI/UX Engineering & Micro-Interactions',
    description: 'Transforming complex product workflows into intuitive, breathtaking interfaces with fluid Framer Motion animations and precision styling.',
    color: '#CBACF9',
    features: ['Framer Motion', 'Adaptive Glassmorphism', 'Design Systems'],
  },
  {
    id: 3,
    icon: <FaServer />,
    title: 'End-to-End API & Serverless Engines',
    description: 'Designing resilient serverless backends, webhook dispatchers, transactional email engines (Nodemailer), and secure authenticated endpoints.',
    color: '#8A2BE2',
    features: ['Nodemailer Transports', 'Vercel Serverless', 'REST & GraphQL'],
  },
  {
    id: 4,
    icon: <FaRobot />,
    title: 'Intelligent AI Agent Integration',
    description: 'Infusing applications with generative AI capabilities — from Google Gemini conversational assistants to computer-vision MediaPipe pipelines.',
    color: '#FF007A',
    features: ['Gemini API', 'Computer Vision', 'Interactive Agents'],
  },
  {
    id: 5,
    icon: <FaDatabase />,
    title: 'Data Infrastructure & Optimization',
    description: 'Structuring scalable relational (MySQL) and document (MongoDB) databases with indexed query paths and robust data caching layers.',
    color: '#38BDF8',
    features: ['MongoDB & MySQL', 'Indexing & Caching', 'Schema Design'],
  },
  {
    id: 6,
    icon: <FaRocket />,
    title: 'Speed Optimization & Production Audits',
    description: 'Diagnosing bundle bottlenecks, Core Web Vitals, and accessibility gaps to guarantee seamless 60fps rendering across all viewports.',
    color: '#F59E0B',
    features: ['100 Lighthouse Goal', 'Bundle Splitting', 'Zero FOUC'],
  },
];

export default function Services(): React.JSX.Element {
  return (
    <section id="services" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00DFD8] bg-[#00DFD8]/10 border border-[#00DFD8]/30 px-3.5 py-1.5 rounded-full mb-4 shadow-[0_0_15px_rgba(0,223,216,0.15)] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00DFD8] animate-pulse" />
            <span>CAPABILITIES // ENGINEERING DISCIPLINES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Specialized <span className="bg-gradient-to-r from-white via-[#CBACF9] to-[#00DFD8] bg-clip-text text-transparent">Offerings</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Delivering bespoke engineering solutions engineered to propel enterprises and founders lightyears ahead of standard digital solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-8 rounded-3xl bg-[#0d0826]/75 backdrop-blur-xl border border-[#CBACF9]/15 hover:border-[#CBACF9]/35 hover:-translate-y-1.5 transition-all duration-300 shadow-xl flex flex-col"
            >
              <div
                className="w-13 h-13 rounded-2xl bg-white/5 border flex items-center justify-center text-2xl mb-5"
                style={{ color: service.color, borderColor: `${service.color}40` }}
              >
                {service.icon}
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-3 tracking-tight">
                {service.title}
              </h3>

              <p className="text-slate-300/80 text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((feat, fIdx) => (
                  <span
                    key={fIdx}
                    className="font-mono text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10"
                    style={{ color: service.color }}
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
