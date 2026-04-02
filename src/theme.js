// CSS Variables for light theme
export const cssVariables = {
  '--bg-color': '#FFFFFF',
  '--color-background': '#FFFFFF',
  '--color-text-primary': 'rgba(0, 0, 0, 0.87)',
  '--color-text-secondary': 'rgba(0, 0, 0, 0.6)',
  '--card-bg': '#FFFFFF',
  '--border-color': 'rgba(0, 0, 0, 0.12)',
  '--primary-color': '#CBACF9',
  '--aura-glow': 'rgba(203, 172, 249, 0.3)',
};

// CSS Variables for dark theme
export const cssVariablesDark = {
  '--bg-color': '#030014',
  '--color-background': '#030014',
  '--color-text-primary': 'rgba(255, 255, 255, 0.95)',
  '--color-text-secondary': 'rgba(255, 255, 255, 0.7)',
  '--card-bg': 'rgba(255, 255, 255, 0.03)',
  '--border-color': 'rgba(255, 255, 255, 0.1)',
  '--primary-color': '#CBACF9',
  '--aura-glow': 'rgba(203, 172, 249, 0.5)',
};

const colors = {
  // Brand colors
  primary: {
    main: '#CBACF9',
    light: '#E0CFFC',
    dark: '#9B7BC9',
    contrastText: '#000000',
  },
  secondary: {
    main: '#1A1A1A',
    light: '#2A2A2A',
    dark: '#000000',
    contrastText: '#FFFFFF',
  },
  // Status colors
  error: {
    main: '#FF4D4D',
    light: '#FF8080',
    dark: '#B30000',
  },
  warning: {
    main: '#FFB84D',
    light: '#FFD180',
    dark: '#B37400',
  },
  info: {
    main: '#4DABFF',
    light: '#80C6FF',
    dark: '#005FB3',
  },
  success: {
    main: '#4DFF88',
    light: '#80FFB3',
    dark: '#00B33C',
  },
  // Common colors
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  grey: {
    50: '#FBFBFE',
    100: '#F7F7F9',
    200: '#E1E1E6',
    300: '#C9C9D1',
    400: '#AFB2BD',
    500: '#9499AD',
    700: '#4D525D',
    800: '#23262F',
    900: '#141416',
  },
};

// Theme configuration
export const theme = {
  // Layout
  layout: {
    maxWidth: '1200px',
    headerHeight: '80px',
  },
  // Spacing
  spacing: (factor) => `${0.5 * factor}rem`,
  // Shape
  shape: {
    borderRadius: 12,
  },
  // Typography
  typography: {
    fontFamily: '"Outfit", "Poppins", sans-serif',
    h1: {
      fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.7,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  // Breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  // Custom Shadows / Effects
  custom: {
    glass: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    },
    glow: '0 0 20px rgba(203, 172, 249, 0.3)',
    aura: '0 0 40px rgba(203, 172, 249, 0.15)',
  },
  // Light theme palette
  palette: {
    mode: 'light',
    ...colors,
    background: {
      default: '#FBFBFE',
      paper: '#FFFFFF',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },
  // Dark theme palette
  dark: {
    mode: 'dark',
    ...colors,
    background: {
      default: '#030014',
      paper: 'rgba(255, 255, 255, 0.02)',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.95)',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  // MUI component overrides
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '12px 28px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px rgba(203, 172, 249, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.025)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 20,
          '&:hover': {
            borderColor: 'rgba(203, 172, 249, 0.3)',
            background: 'rgba(255, 255, 255, 0.04)',
          },
        },
      },
    },
  },
};

export default theme;