// CSS Variables for light theme
export const cssVariables = {
  '--bg-color': '#FFFFFF',
  '--color-background': '#FFFFFF',
  '--color-text-primary': 'rgba(0, 0, 0, 0.87)',
  '--color-text-secondary': 'rgba(0, 0, 0, 0.6)',
  '--card-bg': '#FFFFFF',
  '--border-color': 'rgba(0, 0, 0, 0.12)',
  '--primary-color': '#CBACF9',
};

// CSS Variables for dark theme
export const cssVariablesDark = {
  '--bg-color': '#121212',
  '--color-background': '#121212',
  '--color-text-primary': 'rgba(255, 255, 255, 0.87)',
  '--color-text-secondary': 'rgba(255, 255, 255, 0.7)',
  '--card-bg': '#1E1E1E',
  '--border-color': 'rgba(255, 255, 255, 0.12)',
  '--primary-color': '#CBACF9',
};

const colors = {
  // Brand colors
  primary: {
    main: '#CBACF9',
    light: '#E0CFFC',
    dark: '#9B7BC9',
    contrastText: '#1A1A1A',
  },
  secondary: {
    main: '#4A4A4A',
    light: '#757575',
    dark: '#212121',
    contrastText: '#FFFFFF',
  },
  // Status colors
  error: {
    main: '#F44336',
    light: '#EF9A9A',
    dark: '#C62828',
  },
  warning: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#F57C00',
  },
  info: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
  },
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
  },
  // Common colors
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  // Grayscale
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
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
    borderRadius: 8,
  },
  // Typography
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      fontFamily: '"Poppins", sans-serif',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      fontFamily: '"Poppins", sans-serif',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      fontFamily: '"Poppins", sans-serif',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
      fontFamily: '"Poppins", sans-serif',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
      fontFamily: '"Poppins", sans-serif',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
      fontFamily: '"Poppins", sans-serif',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontFamily: '"Poppins", sans-serif',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontFamily: '"Poppins", sans-serif',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontFamily: '"Poppins", sans-serif',
    },
    subtitle1: {
      fontFamily: '"Poppins", sans-serif',
    },
    subtitle2: {
      fontFamily: '"Poppins", sans-serif',
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
  // Z-index
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  // Transitions
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  // Light theme palette
  palette: {
    mode: 'light',
    ...colors,
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  // Dark theme palette (will be merged when dark mode is enabled)
  dark: {
    mode: 'dark',
    ...colors,
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    action: {
      active: '#FFFFFF',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  // MUI component overrides
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 22px',
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px 0 rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px 0 rgba(0,0,0,0.1)',
        },
      },
    },
  },
};

export default theme;