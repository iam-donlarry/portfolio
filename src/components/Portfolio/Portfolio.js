import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import alterverse from '../../assets/images/porfolio/alterverse.jpeg';
import construction from '../../assets/images/porfolio/construction.jpeg';
import stoke from '../../assets/images/porfolio/stoke.jpeg';
import albaraka from '../../assets/images/porfolio/albaraka.jpeg';
import movieapp from '../../assets/images/porfolio/movieapp.jpg';
import gestureconnect from '../../assets/images/porfolio/gestureconnect.png';
import safetybuddy from '../../assets/images/porfolio/safetybuddy.png';
import shelfalert from '../../assets/images/porfolio/shelfalert.png';

import './Portfolio.css';

const projects = [
  {
    id: 1,
    title: "Alterverse Production",
    category: "Web Design",
    image: alterverse,
    description: "A comprehensive agricultural and food production platform focusing on sustainable farming, fresh produce, and food processing.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    github: 'https://github.com/iam-donlarry',
    demo: 'https://alterverse-production.vercel.app',
  },
  {
    id: 2,
    title: "Alterverse Construction",
    category: "Web Design",
    image: construction,
    description: "A professional construction management portal showcasing infrastructure, commercial, and residential projects with a focus on precision and quality.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    github: 'https://github.com/iam-donlarry',
    demo: 'https://alterverse-construction.vercel.app',
  },
  {
    id: 3,
    title: "Al-Barakah Ethical Business Group",
    category: "Web Design",
    image: albaraka,
    description: "An ethical business platform providing Shariah-compliant financial solutions, including Islamic co-operatives, ethical credit, and leasing services.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "Bootstrap"],
    github: 'https://github.com/iam-donlarry',
    demo: 'https://albarakaethicalbusinessgroup.com.ng',
  },
  {
    id: 4,
    title: "Stoke Marine & Shipping",
    category: "Web Design",
    image: stoke,
    description: "A premium maritime logistics and offshore consultancy platform providing reliable marine shipping services and global supply chain solutions.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    github: 'https://github.com/iam-donlarry',
    demo: 'https://stoke-seagroup.com',
  },
  {
    id: 6,
    title: "NextFlick Movie App",
    category: "Mobile App",
    image: movieapp,
    description: "A dynamic movie discovery platform with detailed film insights, ratings, and a seamless user experience for cinephiles.",
    tags: ["React Native", "Tailwind CSS", "TMDB API"],
    github: 'https://github.com/iam-donlarry/nextflick',
    demo: 'https://github.com/iam-donlarry/nextflick',
  },
  {
    id: 7,
    title: "Gesture Connect",
    category: "Web App",
    image: gestureconnect,
    description: "An AI-powered email platform that translates sign language into text and handles voice-to-text, enabling seamless communication for the deaf and mute community.",
    tags: ["React", "MediaPipe", "Web Speech API"],
    github: 'https://github.com/iam-donlarry/gestureconnect',
    demo: 'https://gestureconnect.pxxl.click/',
  },
  {
    id: 8,
    title: "SafetyBuddy",
    category: "Web App",
    image: safetybuddy,
    description: "A smart, friendly chatbot that provides quick first-aid guidance and safety tips anytime, anywhere.",
    tags: ["Next.js", "Gemini API", "Framer Motion"],
    github: 'https://github.com/iam-donlarry/firstaid-chatbot',
    demo: 'https://github.com/iam-donlarry/firstaid-chatbot',
  },
  {
    id: 9,
    title: "ShelfAlert",
    category: "Web App",
    image: shelfalert,
    description: "A web application designed to help businesses monitor product expiry dates and keep inventory safe. It automatically tracks stock and sends timely alerts.",
    tags: ["HTML", "CSS", "Bootstrap", "PHP", "MySQL"],
    github: 'https://github.com/iam-donlarry/shelfalert',
    demo: 'https://github.com/iam-donlarry/shelfalert',
  },
];

// Get all unique categories
const categories = ['All', ...new Set(projects.map(project => project.category))];

const Portfolio = ({ setActiveSection = () => {} }) => {
  const [filter, setFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection('portfolio');
    }
  }, [inView, setActiveSection]);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  }, [filter]);

  return (
    <section id="portfolio" className="portfolio-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title"><span className="primary-gradient">Portfolio</span></h2>
          <p className="section-subtitle">A selection of my most impactful projects and applications.</p>
        </motion.div>

        <motion.div 
          className="filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="portfolio-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="portfolio-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="project-preview">
                <img src={project.image} alt={project.title} loading="lazy" width="800" height="500" />
                <div className="project-hover-overlay">
                  <div className="project-actions">
                    <a href={project.github} target="_blank" rel="noreferrer" title="View Code"><FaGithub /></a>
                    <a href={project.demo} target="_blank" rel="noreferrer" title="Live Demo"><FaExternalLinkAlt /></a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
