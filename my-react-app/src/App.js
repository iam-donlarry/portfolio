import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header/Header';
import About from './components/About/About';
import Resume from './components/Resume/Resume';
import Portfolio from './components/Portfolio/Portfolio';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <About setActiveSection={setActiveSection} />
              <Resume setActiveSection={setActiveSection} />
              <Portfolio setActiveSection={setActiveSection} />
              <Services setActiveSection={setActiveSection} />
              <Contact setActiveSection={setActiveSection} />
            </>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
