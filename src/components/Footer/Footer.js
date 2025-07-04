import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      icon: <FaGithub />,
      url: 'https://github.com/yourusername',
      name: 'GitHub'
    },
    {
      icon: <FaLinkedin />,
      url: 'https://linkedin.com/in/yourprofile',
      name: 'LinkedIn'
    },
    {
      icon: <FaTwitter />,
      url: 'https://twitter.com/yourhandle',
      name: 'Twitter'
    },
    {
      icon: <FaEnvelope />,
      url: 'mailto:adekunlequadri3@gmail.com',
      name: 'Email'
    }
  ];

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-info">
            <h3>Quadri Adekunle</h3>
            <p>
              A passionate Front-End Developer with hands-on experience in PHP and MySQL backend. 
              I create clean, responsive user interfaces and robust, database-driven applications.
            </p>
          </div>

          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.name}
                className="social-icon"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="copyright">
          &copy; Copyright {currentYear} <strong>Quadri Adekunle</strong>. All Rights Reserved
        </div>
        
        <div className="credits">
          Designed with ❤️ by <a href="#home" className="scroll-to">Quadri Adekunle</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
