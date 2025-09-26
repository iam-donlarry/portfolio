import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';
import * as S from './CustomNav.styles';

const CustomNav = ({ themeMode = 'light', onToggleTheme, activeSection = '', setActiveSection = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { to: 'about', text: 'About' },
    { to: 'portfolio', text: 'Portfolio' },
    { to: 'services', text: 'Services' },
    { to: 'resume', text: 'Resume' },
    { to: 'contact', text: 'Contact' },
  ];

  // Function to check if a nav item is active
  const isActive = (to) => activeSection === to;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
    setActiveSection('home');
  };

  return (
    <S.Nav className={scrolled ? 'scrolled' : ''}>
      <S.Logo to="#home" onClick={handleNavClick}>
        <img src="/logo2.svg" alt="Logo" />
      </S.Logo>
      
      <S.RightAligned>
        <S.ThemeToggle
          onClick={onToggleTheme}
          aria-label={themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {themeMode === 'dark' ? <FaSun /> : <FaMoon />}
        </S.ThemeToggle>
        <S.MobileMenuButton onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <FaTimes /> : <FaBars />}
        </S.MobileMenuButton>
      </S.RightAligned>

      <S.NavMenu $isOpen={isOpen}>
        {navLinks.map((link) => (
          <S.NavItem key={link.to}>
            <S.NavLink
              to={link.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              onClick={() => {
                setIsOpen(false);
              }}
              onSetActive={() => setActiveSection(link.to)}
              className={isActive(link.to) ? 'active' : ''}
              activeClass="active"
            >
              {link.text}
              {isActive(link.to) && <span className="active-indicator"></span>}
            </S.NavLink>
          </S.NavItem>
        ))}
      </S.NavMenu>
    </S.Nav>
  );
};

export default CustomNav;
