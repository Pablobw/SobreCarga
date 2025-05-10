import React, { useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const isSectionVisible = useInView(sectionRef, { threshold: 0.1 });
  const isTitleVisible = useInView(titleRef, { threshold: 0.5 });
  const isGalleryVisible = useInView(galleryRef, { threshold: 0.3 });
  
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const images = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Sobrecarga en concierto",
      caption: "Primer concierto en Santiago"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Ensayo en el estudio",
      caption: "Sesión de grabación 2023"
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/164693/pexels-photo-164693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Festival de verano",
      caption: "Festival Groove de Santiago"
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Backstage",
      caption: "Detrás de escena"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/210887/pexels-photo-210887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Guitarrista en acción",
      caption: "Detalle en vivo"
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/839443/pexels-photo-839443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      alt: "Concierto nocturno",
      caption: "Presentación Club Funk"
    },
  ];
  
  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };
  
  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage === null) return;
    
    switch(e.key) {
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'Escape':
        closeLightbox();
        break;
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section id="gallery" className="gallery" ref={sectionRef}>
      <div className="container">
        <h2 ref={titleRef} className={`section-title ${isTitleVisible ? 'visible' : ''}`}>
          <span className="accent">Nuestra</span> Galería
        </h2>
        
        <div 
          ref={galleryRef} 
          className={`gallery-grid ${isGalleryVisible ? 'visible' : ''}`}
        >
          {images.map((image, index) => (
            <div 
              key={image.id} 
              className="gallery-item"
              onClick={() => openLightbox(index)}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
              <div className="gallery-overlay">
                <ZoomIn className="zoom-icon" size={24} />
                <p>{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedImage !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={closeLightbox}>
              <X size={24} />
            </button>
            
            <div className="lightbox-image-container">
              <img 
                src={images[selectedImage].src} 
                alt={images[selectedImage].alt} 
                className="lightbox-image"
              />
            </div>
            
            <div className="lightbox-caption">
              <p>{images[selectedImage].caption}</p>
            </div>
            
            <button className="lightbox-nav prev" onClick={prevImage}>
              <ChevronLeft size={40} />
            </button>
            
            <button className="lightbox-nav next" onClick={nextImage}>
              <ChevronRight size={40} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;