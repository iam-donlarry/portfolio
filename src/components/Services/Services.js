import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLaptopCode, FaMobileAlt, FaServer, FaDatabase, FaSearch, FaRocket } from 'react-icons/fa';
import './Services.css';

const Services = ({ setActiveSection }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [hoveredId, setHoveredId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e, id) => {
    if (hoveredId === id) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
      e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
      setMousePosition({ x, y });
    }
  };

  useEffect(() => {
    if (inView) {
      setActiveSection('services');
    }
  }, [inView, setActiveSection]);

  const services = [
    {
      id: 1,
      icon: <FaLaptopCode />,
      title: 'Web Development',
      description: 'Custom website development using modern technologies like React, Next.js, and modern JavaScript frameworks.',
      color: '#4f46e5'
    },
    {
      id: 2,
      icon: <FaMobileAlt />,
      title: 'Responsive Design',
      description: 'Mobile-first approach to ensure your website looks great on all devices and screen sizes.',
      color: '#10b981'
    },
    {
      id: 3,
      icon: <FaServer />,
      title: 'Backend Development',
      description: 'Robust backend solutions using Node.js, Express, and other server-side technologies.',
      color: '#f59e0b'
    },
    {
      id: 4,
      icon: <FaDatabase />,
      title: 'Database Design',
      description: 'Efficient database architecture and optimization for your web applications.',
      color: '#ec4899'
    },
    {
      id: 5,
      icon: <FaSearch />,
      title: 'SEO Optimization',
      description: 'Improve your website\'s visibility and ranking on search engines.',
      color: '#8b5cf6'
    },
    {
      id: 6,
      icon: <FaRocket />,
      title: 'Performance',
      description: 'Speed up your website and improve user experience with performance optimization.',
      color: '#3b82f6'
    }
  ];

  return (
    <section id="services" ref={ref} className="services">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>My Services</h2>
          <p>What I Do Best</p>
        </motion.div>

        <div className="services-grid">
          <AnimatePresence>
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="spotlight-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: service.id * 0.1,
                  ease: [0.2, 0.8, 0.2, 1]
                }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseMove={(e) => handleMouseMove(e, service.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ '--card-color': service.color }}
              >
                <div className="spotlight" />
                <div className="spotlight-content">
                  <div className="service-icon" style={{ color: service.color }}>
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Services;
