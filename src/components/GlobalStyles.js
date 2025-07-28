import { createGlobalStyle } from 'styled-components';
import { cssVariables } from '../theme';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Apply CSS variables */
    ${Object.entries(cssVariables)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n    ')}
  }

  /* Base styles */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: var(--font-default);
    color: var(--color-text-primary);
    background-color: var(--color-background);
    line-height: 1.6;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  /* Typography */
  h1, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: var(--color-text-primary);
  }
  
  h2 {
    font-family: var(--font-heading);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: #000000; /* Force black color */
  }

  h1 { font-size: 3rem; }
  h2 { font-size: 2.25rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }

  p {
    margin-bottom: 1rem;
    color: var(--color-text-secondary);
  }

  /* Links */
  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-primary-dark);
      text-decoration: underline;
    }
  }

  /* Buttons */
  button,
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    font-family: var(--font-default);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    border: 1px solid transparent;
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: var(--color-primary);
    color: white;

    &:hover {
      background-color: var(--color-primary-dark);
      transform: translateY(-1px);
      box-shadow: var(--shadow);
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  /* Forms */
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.75rem 1rem;
    font-family: var(--font-default);
    font-size: 1rem;
    line-height: 1.5;
    color: var(--color-text-primary);
    background-color: white;
    background-clip: padding-box;
    border: 1px solid var(--color-gray);
    border-radius: var(--radius);
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      border-color: var(--color-primary);
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(82, 113, 255, 0.25);
    }

    &::placeholder {
      color: var(--color-dark-gray);
      opacity: 1;
    }
  }

  /* Layout */
  .container {
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
    margin-right: auto;
    margin-left: auto;

    @media (min-width: 640px) {
      max-width: 640px;
    }

    @media (min-width: 768px) {
      max-width: 768px;
    }

    @media (min-width: 1024px) {
      max-width: 1024px;
    }

    @media (min-width: 1280px) {
      max-width: 1280px;
    }
  }

  /* Sections */
  section {
    padding: 1rem 0;
    position: relative;

    .section-header {
      text-align: center;
      margin-bottom: 1rem;

      h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        position: relative;
        display: inline-block;

        &::after {
          content: '';
          position: absolute;
          width: 60px;
          height: 4px;
          background: var(--color-primary);
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 2px;
        }
      }

      p {
        font-size: 1.1rem;
        max-width: 700px;
        margin: 0 auto;
        color: var(--color-text-secondary);
      }
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }

  /* Utilities */
  .text-center { text-align: center; }
  .text-primary { color: var(--color-primary); }
  .bg-light { background-color: var(--color-light-gray); }
  .bg-dark { 
    background-color: var(--color-black); 
    color: white;
    
    h1, h2, h3, h4, h5, h6, p {
      color: white;
    }
  }
  .py-0 { padding-top: 0; padding-bottom: 0; }
  .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
  .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  .py-5 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
  .py-6 { padding-top: 2rem; padding-bottom: 2rem; }
  .py-8 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
  .py-10 { padding-top: 3rem; padding-bottom: 3rem; }
  .py-12 { padding-top: 4rem; padding-bottom: 4rem; }
  .py-16 { padding-top: 5rem; padding-bottom: 5rem; }
  .py-20 { padding-top: 6rem; padding-bottom: 6rem; }
`;

export default GlobalStyles;
