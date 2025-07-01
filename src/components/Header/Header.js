import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaMoon, FaSun, FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const Header = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const headerRef = useRef(null);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      // Show scroll to top button when scrolled down 300px
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setActiveSection('home');
  };

  const navLinks = [
    { id: 'home', label: 'Home', offset: -100 },
    { id: 'about', label: 'About', offset: -80 },
    { id: 'resume', label: 'Resume', offset: -80 },
    { id: 'portfolio', label: 'Portfolio', offset: -80 },
    { id: 'services', label: 'Services', offset: -80 },
    { id: 'contact', label: 'Contact', offset: -80 },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/yourusername' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourprofile' },
    { icon: <FaTwitter />, url: 'https://twitter.com/yourhandle' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.header 
        ref={headerRef}
        className={`header ${scrolled ? 'scrolled' : ''} ${isOpen ? 'mobile-open' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{
          '--glass-bg': theme === 'light' 
            ? 'rgba(255, 255, 255, 0.7)' 
            : 'rgba(18, 18, 18, 0.8)'
        }}
      >
      <div className="container">
        <nav className="navbar">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="logo-container"
          >
            <Link 
              to="home" 
              smooth={true} 
              duration={500} 
              className="logo"
              onClick={() => setActiveSection('home')}
            >
              <span className="logo-text">QA</span>
              <span className="logo-dot">.</span>
            </Link>
          </motion.div>

          <AnimatePresence>
            <motion.div 
              className={`nav-links ${isOpen ? 'active' : ''}`}
              variants={containerVariants}
              initial="hidden"
              animate={isOpen ? 'visible' : 'hidden'}
              exit="exit"
              key="nav-links"
            >
              {navLinks.map((link) => (
                <motion.div 
                  key={link.id} 
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <Link
                    activeClass="active"
                    to={link.id}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={link.offset}
                    className={`nav-link ${
                      activeSection === link.id ? 'active' : ''
                    }`}
                    onClick={() => {
                      setActiveSection(link.id);
                      setIsOpen(false);
                    }}
                    onSetActive={() => setActiveSection(link.id)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div 
            className="nav-actions"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="social-link"
                  aria-label={social.icon.type.name.replace('Fa', '')}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <motion.button 
              className="theme-toggle" 
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 30 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </motion.button>
            
            <motion.button
              className="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          </motion.div>
        </nav>
      </div>
    </motion.header>

    {/* Scroll to Top Button */}
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          className="scroll-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ y: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
    </>
  );
};

export default Header;
