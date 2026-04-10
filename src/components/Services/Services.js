import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaMobileAlt, FaServer, FaDatabase, FaSearch, FaRocket } from 'react-icons/fa';
import SpotlightCard from '../Animations/SpotlightCard';
import './Services.css';

const Services = ({ setActiveSection = () => {} }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection('services');
    }
  }, [inView, setActiveSection]);

  const services = [
    {
      id: 1,
      icon: <FaLaptopCode />,
      title: 'Web Architecture',
      description: 'Building scalable, high-performance web applications using React, Next.js, and modern ecosystems.',
    },
    {
      id: 2,
      icon: <FaMobileAlt />,
      title: 'UI/UX Engineering',
      description: 'Crafting pixel-perfect, responsive interfaces with a focus on usability and premium aesthetics.',
    },
    {
      id: 3,
      icon: <FaServer />,
      title: 'Web Architecture & Systems',
      description: 'End-to-end development with robust backends and seamless API integrations.',
    },
    {
      id: 4,
      icon: <FaDatabase />,
      title: 'Data Infrastructure',
      description: 'Designing efficient database schemas and managing data flow for complex applications.',
    },
    {
      id: 5,
      icon: <FaSearch />,
      title: 'Strategic SEO',
      description: 'Implementing technical SEO best practices to maximize discoverability and reach.',
    },
    {
      id: 6,
      icon: <FaRocket />,
      title: 'Digital Strategy',
      description: 'Consulting on technical roadmaps and optimizing digital performance for growth.',
    }
  ];

  return (
    <section id="services" ref={ref} className="services-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title"><span className="primary-gradient">Services</span></h2>
          <p className="section-subtitle">Delivering high-end digital solutions tailored to your business needs.</p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <SpotlightCard
              key={service.id}
              className="service-card-wrap glass-card"
              spotlightColor="rgba(203, 172, 249, 0.2)"
            >
              <motion.div
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="service-icon-wrap">
                  <div className="service-icon-inner">
                    {service.icon}
                  </div>
                </div>
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </motion.div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
