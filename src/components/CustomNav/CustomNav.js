import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import * as S from './CustomNav.styles';

const CustomNav = ({ activeSection = '', setActiveSection = () => {} }) => {
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
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.Nav className={scrolled ? 'scrolled' : ''}>
      <S.Logo to="about" smooth={true} duration={500} onClick={() => setIsOpen(false)}>
        <img src="/logo2.svg" alt="Logo" />
      </S.Logo>
      
      <S.RightAligned>
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
              onClick={() => setIsOpen(false)}
              onSetActive={() => setActiveSection(link.to)}
              className={isActive(link.to) ? 'active' : ''}
              activeClass="active"
            >
              {link.text}
            </S.NavLink>
          </S.NavItem>
        ))}
      </S.NavMenu>
    </S.Nav>
  );
};

export default CustomNav;
