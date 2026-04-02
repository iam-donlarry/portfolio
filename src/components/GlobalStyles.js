import { createGlobalStyle } from 'styled-components';
import { cssVariables, cssVariablesDark } from '../theme';

const GlobalStyles = createGlobalStyle`
  :root,
  [data-theme='light'] {
    ${Object.entries(cssVariables)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n    ')}
  }

  [data-theme='dark'] {
    ${Object.entries(cssVariablesDark)
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
    scroll-behavior: smooth;
    background-color: var(--bg-color);
  }

  body {
    font-family: 'Outfit', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--color-text-primary);
    background-color: var(--bg-color);
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
  }

  /* Aura Background */
  body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 20%, rgba(203, 172, 249, 0.05) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(203, 172, 249, 0.05) 0%, transparent 40%);
    z-index: -1;
    pointer-events: none;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Outfit', sans-serif;
    color: var(--color-text-primary);
    letter-spacing: -0.01em;
  }

  p {
    color: var(--color-text-secondary);
  }

  /* Glassmorphism Classes */
  .glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: rgba(203, 172, 249, 0.2);
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    }
  }

  /* Neon Text / Glow */
  .text-glow {
    text-shadow: 0 0 20px rgba(203, 172, 249, 0.5);
  }

  .primary-gradient {
    background: linear-gradient(135deg, #CBACF9 0%, #9B7BC9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Selection */
  ::selection {
    background: rgba(203, 172, 249, 0.3);
    color: white;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--bg-color);
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    
    &:hover {
      background: rgba(203, 172, 249, 0.3);
    }
  }

  /* Sections */
  section {
    padding: 80px 0;
    position: relative;
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    text-align: center;
    margin-bottom: 60px;
  }

  /* Utilities */
  /* Aura Blobs */
  .aura-blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    z-index: -1;
    opacity: 0.15;
    pointer-events: none;
    animation: auraFloat 20s infinite alternate;
  }

  .aura-blob-1 {
    width: 400px;
    height: 400px;
    background: #CBACF9;
    top: -100px;
    left: -100px;
    animation-delay: 0s;
  }

  .aura-blob-2 {
    width: 600px;
    height: 600px;
    background: #9B7BC9;
    bottom: -200px;
    right: -100px;
    animation-delay: -5s;
  }

  .aura-blob-3 {
    width: 300px;
    height: 300px;
    background: #CBACF9;
    top: 40%;
    left: 60%;
    animation-delay: -10s;
  }

  .aura-blob-4 {
    width: 450px;
    height: 450px;
    background: rgba(203, 172, 249, 0.05);
    top: 20%;
    left: 10%;
    animation-delay: -15s;
  }

  /* Scroll Top Button */
  .scroll-top-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: white;
    font-size: 1.25rem;
    z-index: 1000;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: fadeInBtn 0.4s ease-out;
  }

  .scroll-top-btn:hover {
    background: rgba(203, 172, 249, 0.3);
    color: #CBACF9;
    transform: translateY(-5px);
  }

  @keyframes auraFloat {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(50px, 50px) scale(1.1); }
  }

  @keyframes fadeInBtn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
`;

export default GlobalStyles;
