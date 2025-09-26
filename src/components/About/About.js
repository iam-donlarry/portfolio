import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUser,  FaGithub, FaLinkedin, FaTwitter,  FaCode, FaTools, FaRocket } from 'react-icons/fa';
import './About.css';

const About = ({ setActiveSection = () => {} }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      setActiveSection('about');
    }
  }, [controls, inView, setActiveSection]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const skills = [
    { name: 'HTML5', src: '/html.png' },
    { name: 'CSS3', src: '/css.png' },
    { name: 'JavaScript', src: '/javascript.png' },
    { name: 'TypeScript', src: '/typescript.svg' },
    { name: 'React', src: '/react.svg' },
    { name: 'Next.js', src: '/nextjs.svg' },
    { name: 'Node.js', src: '/nodejs.png' },
    { name: 'MongoDB', src: '/mongodb.png' },
    { name: 'Tailwind CSS', src: '/tailwind.svg' },
  ];


  const [activeTab, setActiveTab] = useState('about');

  const tabContent = {
    about: (
      <div className="tab-pane active">
        <h3>Who am I?</h3>
        <p>I'm a passionate Frontend Developer with 3+ years of experience in creating beautiful and functional web applications. I specialize in React, JavaScript, and modern web technologies.</p>
        <p>My goal is to build exceptional digital experiences that make a difference.</p>
        <div className="highlight-box">
          <FaRocket className="highlight-icon" />
          <p>Currently working on exciting projects that challenge me to grow every day.</p>
        </div>
        <div className="mt-4">
          <a 
            href="#contact" 
            className="btn btn-primary me-3"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Hire Me
          </a>
          <a 
            href="documents/Quadri-Resume.pdf" 
            className="btn btn-primary"
            download
          >
            Download CV
          </a>
        </div>
      </div>
    ),
    skills: (
      <div className="tab-pane active">
        <h3>My Skills</h3>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card" aria-label={skill.name}>
              <div className="skill-image-wrap">
                <img
                  src={skill.src}
                  alt={skill.name}
                  className="skill-image"
                  loading="lazy"
                />
              </div>
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    
  };

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ y: -20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2>About Me</h2>
          <p>Get to know me better</p>
        </motion.div>

        <motion.div 
          className="profile-card"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div 
            className="profile-image-container"
            variants={itemVariants}
          >
            <motion.div
              className="img-wrapper"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <img 
                src="/images/profile-image.png" 
                alt="Quadri Adekunle" 
                className="profile-image"
              />
              <div className="profile-overlay">
                <div className="social-links">
                  <a href="https://github.com/iam-donlarry" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaGithub />
                  </a>
                  <a href="https://linkedin.com/in/adekunle-quadri-920038213" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaLinkedin />
                  </a>
                  <a href="https://twitter.com/Coredrii" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </motion.div>
            <div className="profile-info">
              <h3>Quadri Adekunle</h3>
              <p>Frontend Developer</p>
            </div>
          </motion.div>

          <motion.div 
            className="profile-content"
            variants={itemVariants}
          >
            <div className="profile-tabs">
              <button 
                className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                <FaUser className="tab-icon" /> About
              </button>
              <button 
                className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <FaCode className="tab-icon" /> Skills
              </button>
            </div>

            <div className="tab-content">
              {tabContent[activeTab]}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
