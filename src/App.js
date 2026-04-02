import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { theme as baseTheme } from './theme';
import GlobalStyles from './components/GlobalStyles';

import { FaArrowUp } from 'react-icons/fa';

// Components
import CustomNav from './components/CustomNav/CustomNav';
import About from './components/About/About';
import Resume from './components/Resume/Resume';
import Portfolio from './components/Portfolio/Portfolio';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mode] = useState('dark'); // Force dark mode for Aura theme

  // Create theme based on mode
  const theme = useMemo(() => {
    const isDark = mode === 'dark';
    const palette = isDark ? baseTheme.dark : baseTheme.palette;
    
    return createTheme({
      ...baseTheme,
      palette: {
        ...palette,
        mode,
      },
    });
  }, [mode]);

  // Set theme mode on initial load
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  // Function to update active section based on scroll position
  const handleScroll = () => {
    // Show/hide scroll top button
    if (window.scrollY > 400) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }

    const scrollPosition = window.scrollY + 200;
    const sections = ['about', 'portfolio', 'services', 'resume', 'contact'];
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle scroll to update active section
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <div className="App">
            {/* Ambient Aura Background Blobs */}
            <div className="aura-blob aura-blob-1" />
            <div className="aura-blob aura-blob-2" />
            <div className="aura-blob aura-blob-3" />
            <div className="aura-blob aura-blob-4" />

            {showScrollTop && (
              <button 
                className="scroll-top-btn glass" 
                onClick={scrollToTop}
                aria-label="Scroll to top"
              >
                <FaArrowUp />
              </button>
            )}
            <CustomNav 
              activeSection={activeSection} 
              themeMode={mode} 
            />
            <main>
              <section id="about">
                <About setActiveSection={setActiveSection} activeSection={activeSection} />
              </section>
              <section id="portfolio">
                <Portfolio setActiveSection={setActiveSection} activeSection={activeSection} />
              </section>
              <section id="services">
                <Services setActiveSection={setActiveSection} activeSection={activeSection} />
              </section>
              <section id="resume">
                <Resume setActiveSection={setActiveSection} activeSection={activeSection} />
              </section>
              <section id="contact">
                <Contact setActiveSection={setActiveSection} activeSection={activeSection} />
              </section>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </StyledEngineProvider>
    </MuiThemeProvider>
  );
};

export default App;