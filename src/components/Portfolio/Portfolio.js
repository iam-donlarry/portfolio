import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import alterverse from '../../assets/images/porfolio/alterverse.jpeg';
import construction from '../../assets/images/porfolio/construction.jpeg';
import homeland from '../../assets/images/porfolio/homeland.jpeg';
import stoke from '../../assets/images/porfolio/stoke.jpeg';
import workpod from '../../assets/images/porfolio/workpod.jpeg';

import './Portfolio.css';

const projects = [
  {
    id: 1,
    title: 'Manufacturing Website',
    description: 'Responsive site designed for a manufacturing and services company, showcasing their factories, products, and team with clean navigation and corporate style.',
    image: alterverse,
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    category: 'Frontend',
    github: 'https://github.com/iam-donlarry',
    demo: 'https://bayehomessolutions.com.ng/alterverse/production',
  },
  {
    id: 2,
    title: 'Construction Website',
    description: ' Responsive construction site for Alterverse Group, highlighting real estate development, material supply, and estate planning with sleek design and easy navigation.',
    image: construction,
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    category: 'Frontend',
    github: 'https://github.com/iam-donlarry',
    demo: 'https://bayehomessolutions.com.ng/alterverse/construction',
  },
  {
    id: 3,
    title: 'Real Estate Website',
    description: 'A real estate platform designed to browse, rent and buy properties, featuring agent profiles, and a user friendly property listing interface',
    image: homeland,
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MYSQL'],
    category: 'Web App',
    github: 'https://github.com/iam-donlarry',
    demo: 'https://bayehomessolutions.com.ng/bayehomes/homeland/',
  },
  {
    id: 4,
    title: 'Shipping & Logistics',
    description: 'A responsive design built for a maritime logistics firm showcasing services and professionalism with clean visuals and easy navigation',
    image: stoke,
    tags: ['HTML', 'Bootstrap', 'CSS3', 'PHP'],
    category: 'Frontend',
    github: 'https://github.com/iam-donlarry',
    demo: 'https://stoke-seagroup.com',
  },
  {
    id: 5,
    title: 'Workspace Booking',
    description: 'A Responsive workspace booking site for offering flexible coworking solutions, seamless online reservations for freelancers and remote teams.',
    image: workpod,
    tags: ['HTML', 'CSS3', 'JS','PHP', 'Paystack'],
    category: 'Web App',
    github: 'https://github.com/iam-donlarry',
    demo: 'https://bayehomessolutions.com.ng/workpod',
  },
  {
    id: 6,
    title: 'Movie Application',
    description: 'A mobile application designed to help users effortlessly discover their next favorite movie or TV show. Powered by The Movie Database (TMDB),',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXa5RpMkHLUpC5csmUnuwsimQGvC0pEoR58w&s',
    tags: ['ReactNative', 'TailwindCSS', 'TMDB API','AppWrite'],
    category: 'Mobile App',
    github: 'https://github.com/iam-donlarry/nextflick',
    demo: 'https://github.com/iam-donlarry/nextflick',
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
          initial={{ y: -20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2>My Portfolio</h2>
          <p>Check out some of my recent work</p>
        </motion.div>

        <motion.div 
          className="filters"
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
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
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="portfolio-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="portfolio-img">
                <img src={project.image} alt={project.title} />
                <div className="portfolio-overlay">
                  <div className="portfolio-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <FaGithub />
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
              </div>
              <div className="portfolio-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="portfolio-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
