import React, { useState, useEffect } from 'react';
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

  return (
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
          className="flex items-center gap-2 text-pink-500 font-bold text-xl group"
        >
          <Zap className="w-6 h-6 text-yellow-400 group-hover:text-cyan-400 transition-colors duration-300" />
          <span className="font-['Permanent_Marker'] group-hover:text-cyan-400 transition-colors duration-300">
            SOBRECARGA
          </span>
        </a>

        {/* Menú móvil */}
        <button 
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="w-6 flex flex-col gap-1">
            <span className={`block h-0.5 w-full bg-cyan-400 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block h-0.5 bg-pink-500 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-3/4'}`}></span>
            <span className={`block h-0.5 w-full bg-yellow-400 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>

        {/* Menú desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {['inicio', 'nosotros', 'musica', 'integrantes', 'contacto'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="relative text-white hover:text-cyan-400 transition-colors duration-300 uppercase text-sm font-bold tracking-wider group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Menú móvil dropdown */}
        <div 
          className={`fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 transform transition-transform duration-500 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:hidden`}
        >
          {['inicio', 'nosotros', 'musica', 'integrantes', 'contacto'].map((item, index) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-white hover:text-cyan-400 transition-colors uppercase text-2xl font-bold tracking-wider"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;