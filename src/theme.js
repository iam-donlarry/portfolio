// Theme configuration for consistent branding across the application

// Utility function to get spacing value
export const spacing = (value) => {
  const spacingValues = [
    0,    // 0
    4,    // 1
    8,    // 2
    12,   // 3
    16,   // 4
    20,   // 5
    24,   // 6
    32,   // 7
    40,   // 8
    48,   // 9
    56,   // 10
    64,   // 11
    72,   // 12
    80,   // 13
    88,   // 14
    96,   // 15
    104,  // 16
    112,  // 17
    120,  // 18
    128,  // 19
  ];
  
  if (typeof value === 'number') {
    return `${spacingValues[value] || value}px`;
  }
  return value;
};

export const theme = {
  // Spacing system (in pixels)
  spacing: [
    0,    // 0
    4,    // 1
    8,    // 2
    12,   // 3
    16,   // 4
    20,   // 5
    24,   // 6
    32,   // 7
    40,   // 8
    48,   // 9
    56,   // 10
    64,   // 11
    72,   // 12
    80,   // 13
    88,   // 14
    96,   // 15
    104,  // 16
    112,  // 17
    120,  // 18
    128,  // 19
  ],

  // Color palette
  palette: {
    primary: {
      main: '#5271ff',
      light: '#6e8efb',
      dark: '#3a5ef5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a777e3',
      light: '#b88ef0',
      dark: '#8e5ed6',
      contrastText: '#ffffff',
    },
    success: {
      main: '#48bb78',
      light: '#68d391',
      dark: '#38a169',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f56565',
      light: '#fc8181',
      dark: '#e53e3e',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ed8936',
      light: '#f6ad55',
      dark: '#dd6b20',
      contrastText: '#1a202c',
    },
    info: {
      main: '#4299e1',
      light: '#63b3ed',
      dark: '#3182ce',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#2d3748',
      secondary: '#4a5568',
      disabled: '#a0aec0',
      hint: '#a0aec0',
      icon: '#718096',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: {
      paper: '#ffffff',
      default: '#f8f9fa',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      default: '"Work Sans", sans-serif',
      heading: '"Playfair Display", serif',
      nav: '"Ubuntu", sans-serif',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      normal: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
  
  // Breakpoints (in pixels)
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  
  // Shadows
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
  ],
  
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
  transition: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
      normal: 300, // Added for backward compatibility
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  transitions: {
    // For Material-UI compatibility
    create: () => 'none',
    getAutoHeightDuration: () => 0,
  },
  
  // Shape
  shape: {
    borderRadius: 4,
    // Add other shape properties as needed
  }
};

// Export CSS variables for global styles
export const cssVariables = {
  // Colors
  '--color-primary': theme.palette.primary.main,
  '--color-primary-light': theme.palette.primary.light,
  '--color-primary-dark': theme.palette.primary.dark,
  '--color-secondary': theme.palette.secondary.main,
  '--color-secondary-light': theme.palette.secondary.light,
  '--color-secondary-dark': theme.palette.secondary.dark,
  '--color-text-primary': theme.palette.text.primary,
  '--color-text-secondary': theme.palette.text.secondary,
  '--color-background-default': theme.palette.background.default,
  '--color-background-paper': theme.palette.background.paper,
  
  // Typography
  '--font-family-default': theme.typography.fontFamily.default,
  '--font-family-heading': theme.typography.fontFamily.heading,
  '--font-family-nav': theme.typography.fontFamily.nav,
  
  // Spacing
  '--spacing-unit': '8px',
  
  // Transitions
  '--transition-short': '150ms',
  '--transition-standard': '300ms',
  '--transition-long': '500ms',
  '--transition-easing': 'cubic-bezier(0.4, 0, 0.2, 1)',
  '--color-white': '#ffffff',
  '--color-light-gray': '#f8f9fa',
  '--color-gray': '#e2e8f0',
  '--color-dark-gray': '#718096',
  '--color-black': '#2d3748',
  '--color-background': theme.palette.background.default,
  '--color-surface': theme.palette.background.paper,
  '--color-text-disabled': theme.palette.text.disabled,
  '--color-text-hint': theme.palette.text.hint,
  '--color-text-icon': theme.palette.text.icon,
  
  '--font-default': theme.typography.fontFamily.default,
  '--font-heading': theme.typography.fontFamily.heading,
  '--font-nav': theme.typography.fontFamily.nav,
  
  '--spacing-1': theme.spacing[1],
  '--spacing-2': theme.spacing[2],
  '--spacing-3': theme.spacing[3],
  '--spacing-4': theme.spacing[4],
  '--spacing-5': theme.spacing[5],
  '--spacing-6': theme.spacing[6],
  '--spacing-8': theme.spacing[8],
  '--spacing-10': theme.spacing[10],
  '--spacing-12': theme.spacing[12],
  '--spacing-16': theme.spacing[16],
  '--spacing-20': theme.spacing[20],
  
  '--radius-sm': '4px',
  '--radius': '6px',
  '--radius-md': '8px',
  '--radius-lg': '12px',
  '--radius-xl': '16px',
  '--radius-2xl': '24px',
  '--radius-full': '9999px',
  
  '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '--shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '--shadow-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  '--shadow-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  '--shadow-none': 'none',
};

// Apply CSS variables to the root element
export const applyGlobalStyles = () => {
  const root = document.documentElement;
  Object.entries(cssVariables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

export default theme;
