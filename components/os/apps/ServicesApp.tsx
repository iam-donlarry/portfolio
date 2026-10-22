'use client';

import React from 'react';
import { 
  FaLaptopCode, 
  FaMobileAlt, 
  FaServer, 
  FaDatabase, 
  FaRocket,
  FaRobot,
  FaCheck
} from 'react-icons/fa';

interface ServiceItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: 1,
    icon: <FaLaptopCode />,
    title: 'High-Performance Web Architecture',
    description: 'Engineering bulletproof, lightning-fast web applications with Next.js App Router, React 19, and Server-Side Pre-Rendering for peak conversion.',
    features: ['Next.js App Router', 'Sub-second Latency', 'SEO Best Practices'],
  },
  {
    id: 2,
    icon: <FaMobileAlt />,
    title: 'UI/UX Engineering & Micro-Interactions',
    description: 'Transforming complex product workflows into intuitive, breathtaking interfaces with fluid Framer Motion animations and precision styling.',
    features: ['Framer Motion', 'Adaptive Glassmorphism', 'Design Systems'],
  },
  {
    id: 3,
    icon: <FaServer />,
    title: 'End-to-End API & Serverless Engines',
    description: 'Designing resilient serverless backends, webhook dispatchers, transactional email engines (Nodemailer), and secure authenticated endpoints.',
    features: ['Nodemailer Transports', 'Vercel Serverless', 'REST & GraphQL'],
  },
  {
    id: 4,
    icon: <FaRobot />,
    title: 'Intelligent AI Agent Integration',
    description: 'Infusing applications with generative AI capabilities — from Google Gemini conversational assistants to computer-vision MediaPipe pipelines.',
    features: ['Gemini API', 'Computer Vision', 'Interactive Agents'],
  },
  {
    id: 5,
    icon: <FaDatabase />,
    title: 'Data Infrastructure & Optimization',
    description: 'Structuring scalable relational (MySQL) and document (MongoDB) databases with indexed query paths and robust data caching layers.',
    features: ['MongoDB & MySQL', 'Indexing & Caching', 'Schema Design'],
  },
  {
    id: 6,
    icon: <FaRocket />,
    title: 'Speed Optimization & Production Audits',
    description: 'Diagnosing bundle bottlenecks, Core Web Vitals, and accessibility gaps to guarantee seamless 60fps rendering across all viewports.',
    features: ['100 Lighthouse Goal', 'Bundle Splitting', 'Zero FOUC'],
  },
];

export default function ServicesApp(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-5 rounded-2xl bg-[#0B0B16] border border-[#915DFF]/25 hover:border-[#915DFF] transition-all space-y-3 flex flex-col"
          >
            <div className="w-11 h-11 rounded-xl bg-[#915DFF]/15 border border-[#915DFF]/40 flex items-center justify-center text-xl text-[#915DFF]">
              {service.icon}
            </div>

            <h3 className="font-display font-bold text-base text-white">
              {service.title}
            </h3>

            <p className="text-slate-300 text-xs leading-relaxed flex-grow">
              {service.description}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-[#915DFF]/15">
              {service.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 font-mono text-[11px] text-slate-300">
                  <FaCheck className="text-[#915DFF] text-[9px] flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
