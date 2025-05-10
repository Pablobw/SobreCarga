import React, { useState, useEffect, Fragment } from 'react';
import { Zap } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener('hashchange', handleRouteChange);
    return () => window.removeEventListener('hashchange', handleRouteChange);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <Fragment>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-md py-2 shadow-xl shadow-pink-600/20' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a 
            href="#inicio" 
            className="flex items-center gap-2 text-pink-500 font-bold text-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
            aria-label="Ir al inicio"
          >
            <Zap className="w-6 h-6 text-yellow-400 group-hover:text-cyan-400 transition-colors duration-300" />
            <span className="font-['Permanent_Marker'] group-hover:text-cyan-400 transition-colors duration-300">
              SOBRECARGA
            </span>
          </a>

          <button 
            className="lg:hidden text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <div className="w-6 flex flex-col gap-1">
              <span className={`block h-0.5 w-full bg-cyan-400 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 bg-pink-500 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-3/4'}`}></span>
              <span className={`block h-0.5 w-full bg-yellow-400 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {['inicio', 'nosotros', 'musica', 'integrantes', 'contacto'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="relative text-white hover:text-cyan-400 transition-colors duration-300 uppercase text-sm font-bold tracking-wider group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Menú móvil fuera del nav para máxima cobertura */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-all duration-500 opacity-100 pointer-events-auto lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          {/* Botón de cierre (X) */}
          <button
            className="absolute top-6 right-6 text-white text-4xl font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            &times;
          </button>
          <nav className="flex flex-col items-center gap-8 mt-8">
            {['INICIO', 'NOSOTROS', 'MÚSICA', 'INTEGRANTES', 'CONTACTO'].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white text-3xl font-extrabold tracking-widest uppercase transition-colors duration-200 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg px-4 py-2"
                style={{
                  transitionDelay: `${index * 80}ms`,
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition: `all 0.3s cubic-bezier(0.4,0,0.2,1) ${index * 80}ms`
                }}
                tabIndex={0}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </Fragment>
  );
};

export default Navbar;