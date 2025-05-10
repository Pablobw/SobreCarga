import { useInView } from 'react-intersection-observer';
import { MapPin, Instagram } from 'lucide-react';
import { BiLogoGmail  } from "react-icons/bi";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { FaYahoo } from "react-icons/fa";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const email = 'acunarojasvictor@gmail.com';
  const subject = 'Contacto para Sobrecarga';
  const body = 'Hola, me gustaría contactar con la banda Sobrecarga.';
  const isMobile = typeof window !== 'undefined' && /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <section 
      id="contacto" 
      className="py-20 relative bg-gradient-to-b from-black to-purple-900/30"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className={`mb-12 transition-all duration-700 transform will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
              <span className="font-['Permanent_Marker'] bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text">
                Contáctanos
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-yellow-400 mx-auto mb-8"></div>
          </div>

          <div className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-gradient-to-br from-black/80 via-purple-900/60 to-black/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl shadow-pink-600/30 p-6 md:p-10 transition-all duration-700 delay-200 will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>  
            {/* Video de fondo borroso */}
            <video
              className="absolute inset-0 w-full h-full object-cover blur-sm brightness-75 z-0"
              src="/videos/videouno.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Contenido de la tarjeta */}
            <div className="relative z-10 w-full flex flex-col items-center text-center space-y-6 md:space-y-8">
              <div>
                <h4 className="font-bold text-white mb-1 text-lg">Email</h4>
                <span className="text-gray-300 select-all text-base break-all">{email}</span>
                <div className="flex flex-wrap gap-3 mt-4 justify-center">
                  <a 
                    href={isMobile ? mailtoUrl : gmailUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-cyan-400 text-white rounded-lg text-sm font-bold shadow-md hover:from-pink-400 hover:to-cyan-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                    aria-label="Enviar email usando Gmail"
                  >
                    <BiLogoGmail className="text-lg" /> Gmail
                  </a>
                  <a 
                    href={isMobile ? mailtoUrl : outlookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-lg text-sm font-bold shadow-md hover:from-blue-500 hover:to-cyan-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label="Enviar email usando Outlook"
                  >
                    <PiMicrosoftOutlookLogoFill className="text-lg" /> Outlook
                  </a>
                  <a 
                    href={isMobile ? mailtoUrl : outlookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-400 text-white rounded-lg text-sm font-bold shadow-md hover:from-purple-500 hover:to-pink-300 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    aria-label="Enviar email usando Yahoo"
                  >
                    <FaYahoo className="text-lg" /> Yahoo
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center mt-2 md:mt-6">
                <MapPin className="w-6 h-6 text-pink-500" />
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Ubicación</h4>
                  <p className="text-gray-300 text-base">Santiago, Chile</p>
                </div>
              </div>
              <div className="mt-4 md:mt-8">
                <h4 className="font-bold text-white mb-3 text-lg">Síguenos en redes sociales</h4>
                <div className="flex gap-4 justify-center">
                  <a
                    href={isMobile ? "instagram://user?username=_sobrecarga_" : "https://www.instagram.com/_sobrecarga_/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-600 to-yellow-400 text-white hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                    aria-label="Seguir en Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;