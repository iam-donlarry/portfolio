import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Nav, Logo, NavMenu, NavItem, NavLink, MobileMenuButton } from './CustomNav.styles';

const CustomNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { to: 'about', text: 'About' },
    { to: 'resume', text: 'Resume' },
    { to: 'services', text: 'Services' },
    { to: 'portfolio', text: 'Portfolio' },
    { to: 'contact', text: 'Contact' },
  ];

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
  };

  return (
    <Nav className={scrolled ? 'scrolled' : ''}>
      <Logo
        to="home"
        smooth={true}
        duration={500}
        offset={-80}
        onClick={handleNavClick}
      >
        <img src="/logo.png"/>
      </Logo>

      <MobileMenuButton onClick={toggleMenu} aria-label="Toggle menu">
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>

      <NavMenu isOpen={isOpen}>
        {navLinks.map((link) => (
          <NavItem key={link.to}>
            <NavLink
              to={link.to}
              smooth={true}
              duration={500}
              offset={-80}
              spy={true}
              activeClass="active"
              onClick={handleNavClick}
            >
              {link.text}
            </NavLink>
          </NavItem>
        ))}
      </NavMenu>
    </Nav>
  );
};

export default CustomNav;
