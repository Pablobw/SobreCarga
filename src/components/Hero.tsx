import React, { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [logoOpacity, setLogoOpacity] = useState(1);

  const handleScroll = useCallback(() => {
    const hero = document.getElementById('inicio');
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    let opacity = 1;
    if (rect.bottom < windowHeight) {
      opacity = Math.max(0, rect.bottom / windowHeight);
    }
    setLogoOpacity(opacity);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      ref={ref}
    >
      <div className="absolute inset-0 bg-black">
        <img 
          src="/images/Logo1.png" 
          alt="Sobrecarga Logo"
          className="absolute inset-0 w-full h-full object-cover md:object-contain opacity-30 blur-sm animate-pulse z-0 pointer-events-none select-none transition-opacity duration-500 will-change-opacity"
          style={{ 
            animationDuration: '4s', 
            opacity: logoOpacity * 0.3,
            transform: 'translateZ(0)'
          }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/70 md:bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(120,40,150,0.2)_1px,transparent_1px)] bg-[length:30px_30px] opacity-50"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/20 blur-[100px] rounded-full animate-pulse will-change-transform"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse will-change-transform" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-black z-10 pointer-events-none"></div>
      </div>
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col items-center text-center">
          <div className={`overflow-hidden transition-all duration-1000 delay-300 will-change-transform ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-xl md:text-3xl font-bold mb-6 overflow-hidden whitespace-nowrap animate-typewriter drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              <span className="text-pink-500">ROCK</span> / <span className="text-cyan-400">FUNK</span> DESDE SANTIAGO DE CHILE
            </h2>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-1000 delay-500 transform will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <a 
              href="#musica" 
              className="px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold rounded-full hover:from-pink-500 hover:to-pink-400 transition-all duration-300 shadow-lg shadow-pink-500/30 uppercase tracking-wide text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            >
              Escuchar Ahora
            </a>
            <a 
              href="#contacto" 
              className="px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold rounded-full hover:bg-cyan-400/10 transition-all duration-300 uppercase tracking-wide text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce will-change-transform z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-1">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-scrollIndicator"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;