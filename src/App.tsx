import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Music from './components/Music';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Loader } from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga para mostrar la animación
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-dark text-white overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Music />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;