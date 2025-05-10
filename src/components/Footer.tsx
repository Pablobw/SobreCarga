import React from 'react';
import { Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 sm:py-10 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="border-t border-gray-800 pt-6 sm:pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
              <span className="font-['Permanent_Marker'] text-white text-lg sm:text-xl">SOBRECARGA</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6 md:mb-0">
              {['inicio', 'nosotros', 'musica', 'integrantes', 'contacto'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-sm uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg px-2 py-1"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-gray-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Sobrecarga. Todos los derechos reservados.
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400"></div>
    </footer>
  );
};

export default Footer;