import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Resume.css';

const Resume = ({ setActiveSection = () => {} }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection('resume');
    }
  }, [inView, setActiveSection]);

  const toggleExpand = (section, id) => {
    setExpandedItems(prev => ({
      ...prev,
      [`${section}-${id}`]: !prev[`${section}-${id}`]
    }));
  };

  const education = [
    {
      id: 1,
      title: 'Higher National Diploma - Computer Science',
      period: '2018 - 2020',
      institution: 'The Federal Polytechnic Ilaro, Ogun, Nigeria',
      description: 'Key coursework: Web Development, Database Design, Object-Oriented Programming, Data Structures, and Algorithms.'
    },
    {
      id: 2,
      title: 'National Diploma - Computer Science',
      period: '2015 - 2017',
      institution: 'The Federal Polytechnic Ilaro, Ogun, Nigeria',
      description: 'Completed foundational studies in programming fundamentals, HTML/CSS, introductory PHP, and relational database concepts.'
    }
  ];

  const experience = [
    {
      id: 1,
      title: 'Front-End Developer',
      period: '2024 - Present',
      company: 'Baye Business Solutions Limited, Lagos, Nigeria',
      responsibilities: [
        'Designed and implemented responsive UI components using HTML5, CSS3, Bootstrap, and JavaScript.',
        'Collaborated with backend team to integrate RESTful APIs and dynamic data, leveraging PHP and MySQL.',
        'Optimized website performance—reduced page load times by 30% through code refactoring and asset minification.',
        'Maintained version control with Git, conducted code reviews, and enforced coding standards.'
      ]
    },
    {
      id: 2,
      title: 'Industrial Trainee',
      period: '2017 - 2018',
      company: 'Roystech IT Solutions, Lagos, Nigeria',
      responsibilities: [
        'Assisted in developing PHP-based web applications, creating user interfaces and connecting them to MySQL databases.',
        'Worked on front-end bug fixes and improved UI components for client websites using JavaScript and Bootstrap.',
        'Participated in daily stand-ups, documenting tasks, and liaising with designers to implement visual designs accurately.',
        'Wrote SQL queries for data retrieval and reporting, ensuring data integrity and efficient storage.'
      ]
    }
  ];

  // Animation variants
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

  return (
    <section id="resume" className="resume" ref={ref}>
      <div className="container">
        <motion.div
          className="section-title"
          initial={{ y: -20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2>Resume</h2>
        </motion.div>

        <motion.div 
          className="resume-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="timeline">
            <div className="timeline-education">
              <motion.h3 className="resume-title" variants={itemVariants}>
                <FaGraduationCap className="title-icon" />
                Education
              </motion.h3>
              <div className="timeline-items">
                {education.map((edu) => {
                  const isExpanded = expandedItems[`edu-${edu.id}`];
                  return (
                    <motion.div 
                      className={`timeline-item ${isExpanded ? 'expanded' : ''}`} 
                      key={edu.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <div className="timeline-point"></div>
                      <div className="timeline-content">
                        <div 
                          className="timeline-header"
                          onClick={() => toggleExpand('edu', edu.id)}
                        >
                          <div>
                            <h4>{edu.title}</h4>
                            <div className="timeline-meta">
                              <span className="period">{edu.period}</span>
                              <span className="divider">•</span>
                              <span className="institution">{edu.institution}</span>
                            </div>
                          </div>
                          <button 
                            className="expand-btn"
                            aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          >
                            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </div>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              className="timeline-details"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <p className="description">{edu.description}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="timeline-experience">
              <motion.h3 className="resume-title" variants={itemVariants}>
                <FaBriefcase className="title-icon" />
                Experience
              </motion.h3>
              <div className="timeline-items">
                {experience.map((exp) => {
                  const isExpanded = expandedItems[`exp-${exp.id}`];
                  return (
                    <motion.div 
                      className={`timeline-item ${isExpanded ? 'expanded' : ''}`} 
                      key={exp.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <div className="timeline-point"></div>
                      <div className="timeline-content">
                        <div 
                          className="timeline-header"
                          onClick={() => toggleExpand('exp', exp.id)}
                        >
                          <div>
                            <h4>{exp.title}</h4>
                            <div className="timeline-meta">
                              <span className="period">{exp.period}</span>
                              <span className="divider">•</span>
                              <span className="company">{exp.company}</span>
                            </div>
                          </div>
                          <button 
                            className="expand-btn"
                            aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          >
                            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </div>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              className="timeline-details"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ul className="responsibilities">
                                {exp.responsibilities.map((item, index) => (
                                  <motion.li 
                                    key={index}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    {item}
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
