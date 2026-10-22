import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#915DFF',
          hover: '#A273FF',
          dark: '#7A40F5',
          dim: 'rgba(145, 93, 255, 0.15)',
          border: 'rgba(145, 93, 255, 0.3)',
        },
        dark: {
          950: '#030307',
          900: '#07070F',
          850: '#0C0C18',
          800: '#111122',
          700: '#1A1A2E',
        },
      },
      fontFamily: {
        sans: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Space Grotesk', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        brand: '0 0 25px rgba(145, 93, 255, 0.45)',
        brandSm: '0 0 12px rgba(145, 93, 255, 0.35)',
        brandLg: '0 0 45px rgba(145, 93, 255, 0.55)',
        window: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(145, 93, 255, 0.25)',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'reverse-spin': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 24s linear infinite',
        'reverse-spin': 'reverse-spin 32s linear infinite',
        fadeIn: 'fadeIn 0.35s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
