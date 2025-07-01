import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaBirthdayCake, FaGraduationCap, FaBriefcase, FaCode, FaTools, FaRocket } from 'react-icons/fa';
import './About.css';

const About = ({ setActiveSection }) => {
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
    { name: 'HTML', level: 95, color: '#E44D26' },
    { name: 'CSS', level: 90, color: '#264DE4' },
    { name: 'JavaScript', level: 85, color: '#F0DB4F' },
    { name: 'React', level: 85, color: '#61DAFB' },
    { name: 'Node.js', level: 80, color: '#68A063' },
  ];

  const personalInfo = [
    { icon: <FaUser />, label: 'Name', value: 'Quadri Adekunle' },
    { icon: <FaGraduationCap />, label: 'Education', value: 'HND Computer Science' },
    { icon: <FaBriefcase />, label: 'Experience', value: '3+ Years' },
    { icon: <FaEnvelope />, label: 'Email', value: 'adekunlequadri3@gmail.com' },
    { icon: <FaPhone />, label: 'Phone', value: '+234 704 227 7326' },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Lagos, Nigeria' },
    { icon: <FaGlobe />, label: 'Website', value: 'quadriadekunle.netlify.app' },
  ];

  const [activeTab, setActiveTab] = useState('about');

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  const tabContent = {
    about: (
      <div className="tab-pane active">
        <h3>Who am I?</h3>
        <p>I'm a passionate Frontend Developer with 5+ years of experience in creating beautiful and functional web applications. I specialize in React, JavaScript, and modern web technologies.</p>
        <p>My goal is to build exceptional digital experiences that make a difference. I love turning complex problems into simple, beautiful, and intuitive solutions.</p>
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
            href="/resume.pdf" 
            className="btn btn-outline-primary"
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
        <div className="skills-container">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percent">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress"
                  style={{ 
                    backgroundColor: skill.color,
                    width: `${skill.level}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    info: (
      <div className="tab-pane active">
        <h3>Personal Info</h3>
        <div className="info-grid">
          {personalInfo.map((info, index) => (
            <div key={index} className="info-item">
              <span className="info-icon">{info.icon}</span>
              <div>
                <span className="info-label">{info.label}:</span>
                <span className="info-value">{info.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
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
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaGithub />
                  </a>
                  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaLinkedin />
                  </a>
                  <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="social-icon">
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
              <button 
                className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => setActiveTab('info')}
              >
                <FaTools className="tab-icon" /> Info
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
