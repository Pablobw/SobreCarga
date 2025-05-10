import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Instagram, Youtube, AlignJustify as Spotify } from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Función para abrir el cliente de correo
  const handleContactClick = (email: string) => {
    window.location.href = `mailto:${email}?subject=Contacto%20para%20Sobrecarga&body=Hola,%20me%20gustaría%20contactar%20con%20la%20banda%20Sobrecarga.`;
  };

  return (
    <section 
      id="contacto" 
      className="py-20 relative bg-gradient-to-b from-black to-purple-900/30"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={`mb-12 transition-all duration-700 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
              <span className="font-['Permanent_Marker'] bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text">
                Contáctanos
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className={`transition-all duration-700 delay-200 transform ${inView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">Escríbenos</h3>
              
              <p className="text-gray-300 mb-8">
                ¿Quieres contratarnos para un evento? ¿Tienes alguna pregunta sobre nuestra música? No dudes en contactarnos para cualquier consulta.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-pink-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Email</h4>
                    <button 
                      onClick={() => handleContactClick('contacto@sobrecarga.cl')}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                    >
                      contacto@sobrecarga.cl
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-pink-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Ubicación</h4>
                    <p className="text-gray-400">Santiago, Chile</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-bold text-white mb-3">Síguenos en redes sociales</h4>
                  <div className="flex gap-4">
                    <a 
                      href="#instagram" 
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-600 to-yellow-400 text-white hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
                    >
                      <Instagram size={20} />
                    </a>
                    <a 
                      href="#youtube" 
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-500 text-white hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
                    >
                      <Youtube size={20} />
                    </a>
                    <a 
                      href="#spotify" 
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-500 text-white hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
                    >
                      <Spotify size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-700 delay-400 transform ${inView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-pink-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">Enviar mensaje</h3>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                      Nombre
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                      Mensaje
                    </label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors duration-200"
                      placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="button"
                    onClick={() => handleContactClick('contacto@sobrecarga.cl')}
                    className="w-full py-3 bg-gradient-to-r from-pink-600 to-cyan-600 text-white font-bold rounded-lg hover:from-pink-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-pink-500/20"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;