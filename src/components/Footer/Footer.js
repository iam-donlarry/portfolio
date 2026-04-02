import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/iam-donlarry', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/adekunle-quadri-920038213', name: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://twitter.com/Coredrii', name: 'Twitter' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/2347042277326', name: 'WhatsApp' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
            <h3 className="primary-gradient">Quadri Adekunle</h3>
            <p>Architecting premium digital experiences with modern web technologies.</p>
          </div>

          <div className="footer-links">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.name}
                className="footer-social-icon glass"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Quadri Adekunle. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
