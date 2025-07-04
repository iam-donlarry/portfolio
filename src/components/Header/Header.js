import React, { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaMoon, FaSun, FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import {
  HeaderContainer,
  Navbar,
  Logo,
  NavLinks,
  NavLink,
  MobileMenuButton,
  ThemeToggle,
  SocialIcons,
  SocialIcon,
  ScrollTopButton
} from './Header.styles';

const Header = (props) => {
  // Log props in development to help with debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('Header props:', {
      activeSection: props?.activeSection,
      hasSetActiveSection: typeof props?.setActiveSection === 'function',
      isScrolled: props?.isScrolled,
      hasToggleTheme: typeof props?.toggleTheme === 'function'
    });
  }

  // Destructure with defaults
  const { 
    activeSection = 'home', 
    setActiveSection = () => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('setActiveSection was called but not provided as a prop to Header');
      }
    },
    isScrolled = false, 
    toggleTheme = () => {}
  } = props || {};
  
  // Safe wrapper for setActiveSection with better error handling
  const safeSetActiveSection = React.useCallback((section) => {
    try {
      if (typeof setActiveSection === 'function') {
        setActiveSection(section);
      } else if (process.env.NODE_ENV === 'development') {
        console.warn('setActiveSection is not a function in safeSetActiveSection');
      }
    } catch (error) {
      console.error('Error in setActiveSection:', error);
    }
  }, [setActiveSection]);
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme: themeContext } = useTheme?.() || {};
  const headerRef = useRef(null);
  
  // Use the theme from props if available, otherwise use context
  const theme = themeContext || 'light';
  
  // Navigation links - memoized to prevent unnecessary re-renders
  const navLinks = React.useMemo(() => [
    { to: 'about', text: 'About' },
    { to: 'resume', text: 'Resume' },
    { to: 'portfolio', text: 'Portfolio' },
    { to: 'services', text: 'Services' },
    { to: 'contact', text: 'Contact' },
  ], []);
  
  // Scroll to top handler
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };

  // Social links
  const socialLinks = [
    { url: 'https://github.com/yourusername', icon: <FaGithub />, label: 'GitHub' },
    { url: 'https://linkedin.com/in/yourusername', icon: <FaLinkedin />, label: 'LinkedIn' },
    { url: 'https://twitter.com/yourusername', icon: <FaTwitter />, label: 'Twitter' },
  ];

  // Handle scroll effects for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <HeaderContainer 
        ref={headerRef} 
        className={isScrolled ? 'scrolled' : ''}
      >
        <Navbar>
          <ScrollLink 
            to="home" 
            smooth={true} 
            duration={500} 
            offset={-80}
          >
            <Logo 
              onClick={() => {
                safeSetActiveSection('home');
                scrollToTop();
              }}
            >
              DL
            </Logo>
          </ScrollLink>
          
          <NavLinks 
            isOpen={isOpen}
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate={isOpen ? 'show' : 'hidden'}
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    as={ScrollLink}
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    activeClass="active"
                    className={activeSection === link.to ? 'active' : ''}
                    onClick={() => {
                      safeSetActiveSection(link.to);
                      setIsOpen(false);
                    }}
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>
            
            <SocialIcons>
              {socialLinks.map((social, index) => (
                <SocialIcon 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  variants={itemVariants}
                  custom={navLinks.length + index}
                >
                  {social.icon}
                </SocialIcon>
              ))}
            </SocialIcons>
            
            {toggleTheme && (
              <ThemeToggle 
                onClick={toggleTheme} 
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                variants={itemVariants}
                custom={navLinks.length + socialLinks.length}
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
              </ThemeToggle>
            )}
          </NavLinks>
          
          <MobileMenuButton 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </Navbar>
      </HeaderContainer>
      
      <AnimatePresence>
        {showScrollTop && (
          <ScrollTopButton 
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </ScrollTopButton>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
