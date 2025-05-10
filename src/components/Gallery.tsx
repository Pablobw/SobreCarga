import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { X } from 'lucide-react';

// Simulación de galería de imágenes
const images = [
  {
    id: 1,
    url: "https://i.ibb.co/NKH8yCf/sobrecarga-corazon.png",
    title: "Da Lo Mismo - Arte"
  },
  {
    id: 2,
    url: "https://i.ibb.co/Vgc7kYL/sobrecarga-neon-logo.png",
    title: "Logo Neón"
  },
  {
    id: 3,
    url: "https://i.ibb.co/hVbsBSh/sobrecarga-logo-neon.png",
    title: "Logo Rectangular"
  },
  {
    id: 4, 
    url: "https://i.ibb.co/5vrGtPv/sobrecarga-noes-un-juego.png",
    title: "No Es Un Juego - Portada"
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "En Vivo - Santiago"
  },
  {
    id: 6,
    url: "https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Ensayo - Estudio"
  }
];

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section 
      id="galeria" 
      className="py-20 relative"
      ref={ref}
    >
      {/* Fondo con efecto */}
      <div className="absolute inset-0 bg-black z-0">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(120,40,150,0.2)_1px,transparent_1px)] bg-[length:30px_30px] opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className={`mb-12 transition-all duration-700 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
              <span className="font-['Permanent_Marker'] bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Galería
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div 
                key={image.id}
                className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-700 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-w-4 aspect-h-3 overflow-hidden bg-gray-900">
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    onClick={() => openLightbox(index)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                    <button 
                      onClick={() => openLightbox(index)}
                      className="self-start text-sm text-cyan-400 hover:text-white transition-colors duration-200"
                    >
                      Ver Imagen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors duration-200"
          >
            <X size={30} />
          </button>
          
          <div className="max-w-4xl w-full">
            <div className="relative">
              <img 
                src={images[currentImage].url} 
                alt={images[currentImage].title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-white font-bold text-xl">{images[currentImage].title}</h3>
            </div>
            
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full ${currentImage === index ? 'bg-pink-500' : 'bg-white/30'}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;