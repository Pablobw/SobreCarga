import { useInView } from 'react-intersection-observer';

const Integrantes = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section 
      id="integrantes" 
      className="py-20 relative bg-gradient-to-b from-black to-purple-900/30"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className={`mb-12 transition-all duration-700 transform will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
              <span className="font-['Permanent_Marker'] bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Integrantes
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto mb-8"></div>
          </div>

          <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-pink-600/30 p-6 md:p-10 transition-all duration-700 delay-200 will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}> 
            <div className="w-64 sm:w-80 h-64 sm:h-80 rounded-2xl overflow-hidden bg-black flex items-center justify-center border-4 border-transparent group shadow-2xl relative transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_40px_10px_rgba(236,72,153,0.6)] before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:border-4 before:border-transparent before:bg-gradient-to-br before:from-pink-500 before:via-cyan-400 before:to-yellow-400 before:opacity-60 before:blur-md before:z-[-1]">
              <img 
                src="/images/yoyo.jpg" 
                alt="Yoyo - Integrante"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ imageRendering: 'auto' }}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 text-transparent bg-clip-text animate-fadeInUp drop-shadow-[0_2px_10px_rgba(236,72,153,0.7)]">Yoyo</h3>
              <div className="w-16 h-1 mx-auto md:mx-0 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 rounded-full mb-4 animate-fadeInUp"></div>
              <h4 className="text-lg md:text-xl font-semibold text-cyan-400 mb-4 animate-fadeInUp drop-shadow-[0_2px_8px_rgba(34,211,238,0.5)]">Guitarra</h4>
              <p className="text-gray-200 leading-relaxed animate-fadeInUp bg-black/40 p-4 rounded-xl shadow-inner border border-pink-500/10">
                Músico y compositor de Santiago de Chile. Apasionado por el rock y el funk, siempre buscando nuevas formas de expresión y energía en el escenario.
              </p>
            </div>
          </div>

          <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-pink-600/30 p-6 md:p-10 mt-10 transition-all duration-700 delay-300 will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}> 
            <div className="w-64 sm:w-80 h-64 sm:h-80 rounded-2xl overflow-hidden bg-black flex items-center justify-center border-4 border-transparent group shadow-2xl relative transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_40px_10px_rgba(236,72,153,0.6)] before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:border-4 before:border-transparent before:bg-gradient-to-br before:from-pink-500 before:via-cyan-400 before:to-yellow-400 before:opacity-60 before:blur-md before:z-[-1]">
              <img 
                src="/images/Claudio.jpg" 
                alt="Claudio - Bajista"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ imageRendering: 'auto' }}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 text-transparent bg-clip-text animate-fadeInUp drop-shadow-[0_2px_10px_rgba(236,72,153,0.7)]">Claudio</h3>
              <div className="w-16 h-1 mx-auto md:mx-0 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 rounded-full mb-4 animate-fadeInUp"></div>
              <h4 className="text-lg md:text-xl font-semibold text-cyan-400 mb-4 animate-fadeInUp drop-shadow-[0_2px_8px_rgba(34,211,238,0.5)]">Bajista</h4>
              <p className="text-gray-200 leading-relaxed animate-fadeInUp bg-black/40 p-4 rounded-xl shadow-inner border border-pink-500/10">
                Conocido artísticamente como Claudinho, además de su labor en el bajo, desempeña un rol clave como compositor y co-productor, aportando en la creación musical y en el desarrollo sonoro del proyecto.
              </p>
            </div>
          </div>

          <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-pink-600/30 p-6 md:p-10 mt-10 transition-all duration-700 delay-400 will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}> 
            <div className="w-64 sm:w-80 h-64 sm:h-80 rounded-2xl overflow-hidden bg-black flex items-center justify-center border-4 border-transparent group shadow-2xl relative transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_40px_10px_rgba(236,72,153,0.6)] before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:border-4 before:border-transparent before:bg-gradient-to-br before:from-pink-500 before:via-cyan-400 before:to-yellow-400 before:opacity-60 before:blur-md before:z-[-1]">
              <img 
                src="/images/Seba.jpg" 
                alt="Seba - Baterista"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ imageRendering: 'auto' }}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 text-transparent bg-clip-text animate-fadeInUp drop-shadow-[0_2px_10px_rgba(236,72,153,0.7)]">Seba</h3>
              <div className="w-16 h-1 mx-auto md:mx-0 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 rounded-full mb-4 animate-fadeInUp"></div>
              <h4 className="text-lg md:text-xl font-semibold text-cyan-400 mb-4 animate-fadeInUp drop-shadow-[0_2px_8px_rgba(34,211,238,0.5)]">Batería</h4>
              <p className="text-gray-200 leading-relaxed animate-fadeInUp bg-black/40 p-4 rounded-xl shadow-inner border border-pink-500/10">
                Baterista y motor rítmico de la banda. Apasionado por los ritmos complejos y la energía en vivo. Siempre marcando el pulso del grupo.
              </p>
            </div>
          </div>

          <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-pink-600/30 p-6 md:p-10 mt-10 transition-all duration-700 delay-400 will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}> 
            <div className="w-64 sm:w-80 h-64 sm:h-80 rounded-2xl overflow-hidden bg-black flex items-center justify-center border-4 border-transparent group shadow-2xl relative transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_40px_10px_rgba(236,72,153,0.6)] before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:border-4 before:border-transparent before:bg-gradient-to-br before:from-pink-500 before:via-cyan-400 before:to-yellow-400 before:opacity-60 before:blur-md before:z-[-1]">
              <img 
                src="/images/Diego.jpg" 
                alt="Diego - Vocalista"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ imageRendering: 'auto' }}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 text-transparent bg-clip-text animate-fadeInUp drop-shadow-[0_2px_10px_rgba(236,72,153,0.7)]">Diego</h3>
              <div className="w-16 h-1 mx-auto md:mx-0 bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 rounded-full mb-4 animate-fadeInUp"></div>
              <h4 className="text-lg md:text-xl font-semibold text-cyan-400 mb-4 animate-fadeInUp drop-shadow-[0_2px_8px_rgba(34,211,238,0.5)]">Vocalista</h4>
              <p className="text-gray-200 leading-relaxed animate-fadeInUp bg-black/40 p-4 rounded-xl shadow-inner border border-pink-500/10">
                La voz de la banda. Amante del metal, el indie en inglés y los boleros chilenos. Siempre buscando entregar bonitas letras a la banda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrantes;