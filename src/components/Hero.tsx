import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    
    if (title && subtitle) {
      title.classList.add('visible');
      
      setTimeout(() => {
        subtitle.classList.add('visible');
      }, 500);
    }
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">SOBRECARGA</h1>
        <p ref={subtitleRef} className="hero-subtitle">Rock & Funk desde Santiago de Chile</p>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
          <p className="scroll-text">Desplázate</p>
        </div>
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-background"></div>
    </section>
  );
};

export default Hero;