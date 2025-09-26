import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { theme as baseTheme } from './theme';
import GlobalStyles from './components/GlobalStyles';

// Components
import CustomNav from './components/CustomNav/CustomNav';
import About from './components/About/About';
import Resume from './components/Resume/Resume';
import Portfolio from './components/Portfolio/Portfolio';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

// Scroll to top helper
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mode, setMode] = useState(
    localStorage.getItem('themeMode') ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

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
      components: {
        ...baseTheme.components,
        MuiCssBaseline: {
          styleOverrides: {
            html: {
              backgroundColor: palette.background?.default,
            },
            body: {
              backgroundColor: palette.background?.default,
              color: palette.text?.primary,
              transition: 'background-color 0.3s ease, color 0.3s ease',
            },
          },
        },
      },
    });
  }, [mode]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const nextMode = mode === 'light' ? 'dark' : 'light';
    setMode(nextMode);
    localStorage.setItem('themeMode', nextMode);
  };

  // Set theme mode on initial load
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  // Function to update active section based on scroll position
  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + 100;
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

  // Handle scroll to update active section
  useEffect(() => {
    // Initial check on mount
    updateActiveSection();
    
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveSection);
    
    // Cleanup
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <div className="App">
            <ScrollToTop />
            <CustomNav 
              activeSection={activeSection} 
              onToggleTheme={toggleTheme} 
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