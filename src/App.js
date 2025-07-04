import React, { useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyles from './components/GlobalStyles';

// Components
import Header from './components/Header/Header';
import About from './components/About/About';
import Resume from './components/Resume/Resume';
import Portfolio from './components/Portfolio/Portfolio';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

// Scroll to top component
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

// Create MUI theme
const muiTheme = createTheme({
  palette: {
    primary: {
      main: theme.palette.primary.main,
      light: theme.palette.primary.light,
      dark: theme.palette.primary.dark,
      contrastText: theme.palette.primary.contrastText,
    },
    secondary: {
      main: theme.palette.secondary.main,
      light: theme.palette.secondary.light,
      dark: theme.palette.secondary.dark,
      contrastText: theme.palette.secondary.contrastText,
    },
    error: {
      main: theme.palette.error.main,
      light: theme.palette.error.light,
      dark: theme.palette.error.dark,
      contrastText: theme.palette.error.contrastText,
    },
    warning: {
      main: theme.palette.warning.main,
      light: theme.palette.warning.light,
      dark: theme.palette.warning.dark,
      contrastText: theme.palette.warning.contrastText,
    },
    info: {
      main: theme.palette.info.main,
      light: theme.palette.info.light,
      dark: theme.palette.info.dark,
      contrastText: theme.palette.info.contrastText,
    },
    success: {
      main: theme.palette.success.main,
      light: theme.palette.success.light,
      dark: theme.palette.success.dark,
      contrastText: theme.palette.success.contrastText,
    },
    text: {
      primary: theme.palette.text.primary,
      secondary: theme.palette.text.secondary,
      disabled: theme.palette.text.disabled,
      hint: theme.palette.text.hint,
      icon: theme.palette.text.icon,
    },
    background: {
      default: theme.palette.background.default,
      paper: theme.palette.background.paper,
    },
    action: theme.palette.action,
  },
  typography: {
    fontFamily: theme.typography.fontFamily.default,
    fontWeightLight: theme.typography.fontWeight.light,
    fontWeightRegular: theme.typography.fontWeight.regular,
    fontWeightMedium: theme.typography.fontWeight.medium,
    fontWeightBold: theme.typography.fontWeight.bold,
    h1: {
      fontFamily: theme.typography.fontFamily.heading,
      fontSize: theme.typography.fontSize['4xl'],
      fontWeight: theme.typography.fontWeight.bold,
      lineHeight: theme.typography.lineHeight.tight,
    },
    h2: {
      fontFamily: theme.typography.fontFamily.heading,
      fontSize: theme.typography.fontSize['3xl'],
      fontWeight: theme.typography.fontWeight.bold,
      lineHeight: theme.typography.lineHeight.tight,
    },
    h3: {
      fontFamily: theme.typography.fontFamily.heading,
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.semiBold,
      lineHeight: theme.typography.lineHeight.snug,
    },
    h4: {
      fontFamily: theme.typography.fontFamily.heading,
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.semiBold,
      lineHeight: theme.typography.lineHeight.snug,
    },
    h5: {
      fontFamily: theme.typography.fontFamily.heading,
      fontSize: theme.typography.fontSize.lg,
      fontWeight: theme.typography.fontWeight.semiBold,
      lineHeight: theme.typography.lineHeight.normal,
    },
    h6: {
      fontFamily: theme.typography.fontFamily.heading,
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.semiBold,
      lineHeight: theme.typography.lineHeight.normal,
    },
    button: {
      textTransform: 'none',
      fontWeight: theme.typography.fontWeight.medium,
    },
    body1: {
      fontSize: theme.typography.fontSize.base,
      lineHeight: theme.typography.lineHeight.relaxed,
    },
    body2: {
      fontSize: theme.typography.fontSize.sm,
      lineHeight: theme.typography.lineHeight.relaxed,
    },
  },
  shape: {
    borderRadius: theme.shape.borderRadius,
  },
  spacing: 4, // This will use the default 8px spacing
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: theme.shadows[2],
          },
        },
      },
    },
  },
});

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll event for header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const sections = ['about', 'resume', 'portfolio', 'services', 'contact'];
      
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  // Combine MUI theme with our custom theme
  const appTheme = {
    ...muiTheme,
    ...theme,
    // Override any specific theme values if needed
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <GlobalStyles />
          <div className="App">
            <ScrollToTop />
            <Header 
              key="main-header"
              isScrolled={isScrolled}
              toggleTheme={toggleTheme}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
            <main>
              <section id="about">
                <About 
                  activeSection={activeSection} 
                  setActiveSection={setActiveSection} 
                />
              </section>
              
              <section id="resume">
                <Resume 
                  activeSection={activeSection} 
                  setActiveSection={setActiveSection} 
                />
              </section>
              
              <section id="portfolio">
                <Portfolio 
                  activeSection={activeSection} 
                  setActiveSection={setActiveSection} 
                />
              </section>
              
              <section id="services">
                <Services 
                  activeSection={activeSection} 
                  setActiveSection={setActiveSection} 
                />
              </section>
              
              <section id="contact">
                <Contact 
                  activeSection={activeSection} 
                  setActiveSection={setActiveSection} 
                />
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
