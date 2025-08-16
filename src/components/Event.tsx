import React from 'react';
import { Calendar, MapPin, ExternalLink, Ticket } from 'lucide-react';

const Event = () => {
  return (
         <section id="evento" className="min-h-screen bg-dark py-20 px-4 relative overflow-hidden">

      <div className="container mx-auto max-w-6xl relative z-10">
                 {/* Título principal */}
         <div className="text-center mb-12">
           <h2 className="text-4xl md:text-6xl font-['Permanent_Marker'] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-4 animate-pulse">
             ¡EVENTO ESPECIAL!
           </h2>
           <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 mx-auto"></div>
         </div>

         {/* Imagen del cartel del evento */}
         <div className="text-center mb-12">
           <div className="max-w-2xl mx-auto">
             <img 
               src="/images/SobrecargaEnVivo.jpg" 
               alt="Sobre Carga EN VIVO - 28 de Agosto - Bar La Casa en el Aire" 
               className="w-full h-auto rounded-2xl shadow-2xl shadow-pink-500/30 border-2 border-pink-500/30 hover:scale-105 transition-transform duration-300"
             />
           </div>
         </div>

         {/* Contenido principal del evento */}
         <div className="max-w-5xl mx-auto">
                       {/* Tarjeta unificada del evento */}
            <div className="bg-gradient-to-br from-purple-900/30 via-black/50 to-pink-900/30 backdrop-blur-sm border-2 border-pink-500/30 rounded-3xl p-8 shadow-2xl">
              {/* Header del evento */}
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
                  LO QUE ESTABAS ESPERANDO
                </h3>
                <p className="text-xl md:text-2xl text-white font-bold mb-4">
                  SOBRECARGA ESTE 28 DE AGOSTO EN EL BAR LA CASA EN EL AIRE
                </p>
                <div className="bg-red-600 text-white text-center py-3 px-6 rounded-xl font-bold text-lg mb-4 inline-block">
                  ¡NO TE LO PIERDAS! SON SOLO 40 CUPOS
                </div>
                <p className="text-lg text-gray-200 leading-relaxed max-w-4xl mx-auto">
                  ACOMPAÑANOS EN ESTE PRIMER SHOW PRESENTANDO LO QUE SE VIENE EN NUESTRO PRIMER ALBUM QUE PRONTO PODRAS ESCUCHAR EN SPOTIFY.
                </p>
              </div>

                           {/* Contenido dividido en dos secciones */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Sección izquierda - Información del evento */}
                <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-5">
                  <div className="text-center mb-4">
                    <Ticket className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                    <h4 className="text-xl font-bold text-yellow-400 mb-2">ENTRADA GRATUITA</h4>
                    <p className="text-white text-base">¡Reserva tu lugar ahora!</p>
                  </div>

                                   <div className="bg-black/50 rounded-xl p-4">
                    <h5 className="text-base font-bold text-cyan-400 mb-3 text-center">Incluye:</h5>
                    <ul className="text-white space-y-2 mb-4">
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        Acceso al show completo
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        Presentación del nuevo álbum
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        Ambiente íntimo (solo 40 cupos)
                      </li>
                    </ul>
                  </div>
               </div>

                               {/* Sección derecha - Detalles del evento */}
                <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-5">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-pink-400" />
                        <h5 className="text-base font-bold text-cyan-400">Fecha y Horarios</h5>
                      </div>
                      <p className="text-white text-sm mb-2">Jueves 28 de Agosto 2025</p>
                      <div className="text-gray-300 text-xs space-y-1">
                        <p><span className="text-yellow-400 font-semibold">Apertura:</span> 20:00 hrs</p>
                        <p><span className="text-yellow-400 font-semibold">Inicio:</span> 20:30 hrs</p>
                        <p><span className="text-yellow-400 font-semibold">Término:</span> 21:30 hrs</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                       <div className="flex items-center justify-center gap-2 mb-2">
                         <MapPin className="w-5 h-5 text-pink-400" />
                         <h5 className="text-base font-bold text-cyan-400">Ubicación</h5>
                       </div>
                       <p className="text-white text-sm mb-2">Bar La Casa en el Aire</p>
                       <p className="text-gray-300 text-xs mb-2">Constitución 40, local 56</p>
                       <p className="text-gray-300 text-xs mb-3">Santiago, Chile</p>
                       
                       <a
                          href="https://maps.app.goo.gl/reFN29HXYEojL8nc6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-2 px-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group text-xs mx-auto w-full max-w-xs"
                        >
                          Ver en Google Maps
                        </a>
                     </div>
                  </div>
                </div>
             </div>

                           {/* Botón de acción principal */}
              <div className="text-center">
                <a
                  href="https://portaldisc.com/evento/sobrecargaenelaire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 group text-lg max-w-md mx-auto"
                >
                  <Ticket className="w-6 h-6 group-hover:animate-bounce" />
                  OBTENER TICKET GRATUITO
                  <ExternalLink className="w-5 h-5" />
                </a>
                <p className="text-gray-300 text-sm text-center mt-3">
                  Haz clic para ir a PortalDisc y reservar tu entrada
                </p>
              </div>
           </div>
         </div>


      </div>
    </section>
  );
};

export default Event;
