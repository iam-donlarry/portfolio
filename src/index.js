import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import App from './App';
import './assets/styles/main.css';

const container = document.getElementById('root');
const root = createRoot(container);

// Add smooth scrolling behavior
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// Listen for route changes and scroll to top
window.addEventListener('popstate', scrollToTop);

root.render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <App onRouteChange={scrollToTop} />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
