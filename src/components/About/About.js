import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './About.css';

const About = ({ setActiveSection = () => {} }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection('about');
    }
  }, [inView, setActiveSection]);

  const skills = [
    { name: 'HTML5', src: '/html.png' },
    { name: 'CSS3', src: '/css.png' },
    { name: 'JavaScript', src: '/javascript.png' },
    { name: 'TypeScript', src: '/typescript.svg' },
    { name: 'React', src: '/react.svg' },
    { name: 'Next.js', src: '/nextjs.svg' },
    { name: 'Node.js', src: '/nodejs.png' },
    { name: 'PHP', src: '/php.svg' },
    { name: 'MongoDB', src: '/mongodb.png' },
    { name: 'MySQL', src: '/mysql.svg' },
    { name: 'Tailwind CSS', src: '/tailwind.svg' },
  ];

  return (
    <section id="about" className="about-hero" ref={ref}>
      <div className="container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="hero-title">
              Crafting <span className="primary-gradient text-glow">Digital Experiences</span> With Precision
            </h1>
            <p className="hero-subtitle">
              Hi, I'm <span className="text-white font-bold">Quadri Adekunle</span>. A Web Developer dedicated to building high-performance, visually stunning web applications.
            </p>
            
            <div className="hero-cta">
              <a href="#portfolio" className="btn btn-primary hero-btn">Explore My Work</a>
              <a href="documents/Quadri-Resume.pdf" className="btn btn-outline-hero hero-btn" download>Download CV</a>
            </div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="glass-profile-card">
              <div className="profile-img-wrap">
                <img src="/images/profile-image.png" alt="Quadri Adekunle" />
              </div>
              <div className="profile-details">
                <h3>Web Developer</h3>
                <div className="social-pills">
                  <a href="https://github.com/iam-donlarry" target="_blank" rel="noreferrer"><FaGithub /></a>
                  <a href="https://linkedin.com/in/adekunle-quadri-920038213" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                  <a href="https://twitter.com/Coredrii" target="_blank" rel="noreferrer"><FaTwitter /></a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="skills-ticker"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="ticker-label">Tech Stack</p>
          <div className="ticker-items">
            {skills.map((skill, index) => (
              <div key={index} className="ticker-item" title={skill.name}>
                <img src={skill.src} alt={skill.name} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
