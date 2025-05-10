import React from 'react';
import { Zap, Heart, Flame } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section 
      id="nosotros" 
      className="py-16 sm:py-20 relative"
      ref={ref}
    >
      {/* Fondo con efecto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900/30 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={`mb-8 sm:mb-12 transition-all duration-700 transform will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
              <span className="font-['Permanent_Marker'] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-transparent bg-clip-text">
                Sobre Nosotros
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-cyan-400 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center">
            <div className={`transition-all duration-700 delay-200 transform will-change-transform ${inView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <img 
                src="/images/Logo2.JPG" 
                alt="Sobrecarga Logo 2" 
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl shadow-pink-600/20 hover:shadow-cyan-400/20 transition-all duration-300"
                loading="lazy"
              />
            </div>

            <div className={`space-y-4 sm:space-y-6 transition-all duration-700 delay-400 transform will-change-transform ${inView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-400">
                Somos más que una banda
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Somos un dúo de Santiago de Chile que fusiona el poder del rock con los ritmos contagiosos del funk. Nacidos de la pasión por la música que desafía lo convencional, Sobrecarga llega para sacudir la escena musical chilena.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Con apenas cinco canciones, estamos comenzando nuestro viaje, pero cada nota está cargada de energía e intensidad. Nuestra música es un reflejo de nuestras influencias diversas y nuestra dedicación a crear algo verdaderamente único.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-black/40 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-pink-500/20 hover:border-pink-500/50 transition-colors duration-300 text-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500">
                  <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500 mx-auto mb-2 group-hover:text-yellow-400 transition-colors duration-300" />
                  <h4 className="font-bold text-white text-sm sm:text-base">Energía</h4>
                </div>
                <div className="bg-black/40 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-cyan-400/20 hover:border-cyan-400/50 transition-colors duration-300 text-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 mx-auto mb-2 group-hover:text-pink-500 transition-colors duration-300" />
                  <h4 className="font-bold text-white text-sm sm:text-base">Pasión</h4>
                </div>
                <div className="bg-black/40 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-yellow-400/20 hover:border-yellow-400/50 transition-colors duration-300 text-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400">
                  <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 mx-auto mb-2 group-hover:text-cyan-400 transition-colors duration-300" />
                  <h4 className="font-bold text-white text-sm sm:text-base">Intensidad</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;