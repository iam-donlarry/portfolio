import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './Portfolio.css';

const projects = [
  {
    id: 1,
    title: 'E-commerce Website',
    description: 'A full-stack e-commerce platform with user authentication, product catalog, and payment integration.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Full Stack',
    github: 'https://github.com/username/ecommerce',
    demo: 'https://ecommerce-demo.com',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A task management application with drag-and-drop functionality and real-time updates.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    tags: ['React', 'Firebase', 'Material-UI'],
    category: 'Web App',
    github: 'https://github.com/username/task-app',
    demo: 'https://task-app-demo.com',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A weather application that displays current weather and forecast using a weather API.',
    image: 'https://images.unsplash.com/photo-1601134467661-3e77560260cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
    tags: ['JavaScript', 'API', 'CSS3'],
    category: 'Frontend',
    github: 'https://github.com/username/weather-app',
    demo: 'https://weather-app-demo.com',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A personal portfolio website to showcase projects and skills with modern design and animations.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
    tags: ['React', 'Bootstrap', 'CSS3'],
    category: 'Frontend',
    github: 'https://github.com/username/portfolio',
    demo: 'https://my-portfolio-demo.com',
  },
  {
    id: 5,
    title: 'Restaurant Website',
    description: 'A responsive restaurant website with online ordering system and menu management.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    tags: ['React', 'Node.js', 'MongoDB'],
    category: 'Full Stack',
    github: 'https://github.com/username/restaurant',
    demo: 'https://restaurant-demo.com',
  },
  {
    id: 6,
    title: 'Chat Application',
    description: 'A real-time chat application with private messaging and group chat functionality.',
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80',
    tags: ['React', 'Socket.io', 'Node.js'],
    category: 'Web App',
    github: 'https://github.com/username/chat-app',
    demo: 'https://chat-app-demo.com',
  },
];

// Get all unique categories
const categories = ['All', ...new Set(projects.map(project => project.category))];

const Portfolio = ({ setActiveSection }) => {
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
