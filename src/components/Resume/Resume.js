import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import './Resume.css';

const Resume = ({ setActiveSection = () => {} }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection('resume');
    }
  }, [inView, setActiveSection]);

  const education = [
    {
      id: 1,
      title: 'HND - Computer Science',
      period: '2018 - 2020',
      institution: 'Federal Polytechnic Ilaro',
      description: 'Advanced studies in Web Architecture, Systems Analysis, and Algorithmic Design.'
    },
    {
      id: 2,
      title: 'ND - Computer Science',
      period: '2015 - 2017',
      institution: 'Federal Polytechnic Ilaro',
      description: 'Foundational programming, database management, and software engineering principles.'
    }
  ];

  const experience = [
    {
      id: 1,
      title: 'Web Developer',
      period: '2024 - Present',
      company: 'Baye Business Solutions',
      responsibilities: [
        'Architecting responsive UI systems with React and modern CSS.',
        'Integrating complex APIs with high-performance frontends.',
        'Optimizing rendering cycles and asset delivery pipelines.',
        'Mentoring junior developers and enforcing architectural standards.'
      ]
    },
    {
      id: 2,
      title: 'Web Development Intern',
      period: '2017 - 2018',
      company: 'Roystech IT Solutions',
      responsibilities: [
        'Developing scalable PHP modules and MySQL integrations.',
        'Refactoring legacy codebases for improved maintainability.',
        'Collaborating on UI/UX improvements for enterprise platforms.',
      ]
    }
  ];

  return (
    <section id="resume" className="resume-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title"><span className="primary-gradient">Resume</span></h2>
          <p className="section-subtitle">A journey through my academic and professional milestones.</p>
        </motion.div>

        <div className="resume-grid">
          <div className="resume-column">
            <h3 className="column-title"><FaGraduationCap /> Education</h3>
            <div className="timeline-trail">
              {education.map((edu, index) => (
                <motion.div 
                  key={edu.id}
                  className="resume-card glass-card"
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <span className="card-period">{edu.period}</span>
                  <h4>{edu.title}</h4>
                  <h5>{edu.institution}</h5>
                  <p>{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="resume-column">
            <h3 className="column-title"><FaBriefcase /> Experience</h3>
            <div className="timeline-trail">
              {experience.map((exp, index) => (
                <motion.div 
                  key={exp.id}
                  className="resume-card glass-card"
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <span className="card-period">{exp.period}</span>
                  <h4>{exp.title}</h4>
                  <h5>{exp.company}</h5>
                  <ul className="card-list">
                    {exp.responsibilities.map((res, i) => (
                      <li key={i}>{res}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
