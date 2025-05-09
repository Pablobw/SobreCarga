import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const tabs = [
    { id: 'live', label: 'Live Shows' },
    { id: 'backstage', label: 'Backstage' },
    { id: 'studio', label: 'In the Studio' },
    { id: 'fans', label: 'With Fans' }
  ];
  
  const galleryImages = {
    live: [
      'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg',
      'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
      'https://images.pexels.com/photos/1656062/pexels-photo-1656062.jpeg',
      'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg',
      'https://images.pexels.com/photos/2147029/pexels-photo-2147029.jpeg',
      'https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg',
      'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg',
      'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg'
    ],
    backstage: [
      'https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg',
      'https://images.pexels.com/photos/8412414/pexels-photo-8412414.jpeg',
      'https://images.pexels.com/photos/7499839/pexels-photo-7499839.jpeg',
      'https://images.pexels.com/photos/5618463/pexels-photo-5618463.jpeg',
      'https://images.pexels.com/photos/7585644/pexels-photo-7585644.jpeg',
      'https://images.pexels.com/photos/8412478/pexels-photo-8412478.jpeg'
    ],
    studio: [
      'https://images.pexels.com/photos/164907/pexels-photo-164907.jpeg',
      'https://images.pexels.com/photos/1238983/pexels-photo-1238983.jpeg',
      'https://images.pexels.com/photos/5412250/pexels-photo-5412250.jpeg',
      'https://images.pexels.com/photos/4988126/pexels-photo-4988126.jpeg',
      'https://images.pexels.com/photos/165971/pexels-photo-165971.jpeg'
    ],
    fans: [
      'https://images.pexels.com/photos/2014773/pexels-photo-2014773.jpeg',
      'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      'https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg',
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg'
    ]
  };
  
  const openLightbox = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  const navigateImage = (direction: 'prev' | 'next') => {
    const images = galleryImages[activeTab as keyof typeof galleryImages];
    const currentIndex = images.indexOf(currentImage);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    } else {
      newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    }
    
    setCurrentImage(images[newIndex]);
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentImage, activeTab]);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item) => {
      observer.observe(item);
    });
    
    return () => {
      galleryItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, [activeTab]);

  return (
    <div className="pt-16">
      {/* Gallery Header */}
      <section className="py-12 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Photo Gallery</h1>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Browse through moments captured from our performances, studio sessions, 
            backstage excitement, and interactions with amazing fans.
          </p>
          
          {/* Gallery Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex flex-wrap justify-center bg-gray-800/50 rounded-full p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 rounded-full transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-fuchsia-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Grid */}
      <section className="py-8 bg-black min-h-[60vh]" ref={galleryRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages[activeTab as keyof typeof galleryImages].map((img, index) => (
              <div 
                key={index}
                className="gallery-item opacity-0 overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => openLightbox(img)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img 
                  src={img} 
                  alt={`Gallery image ${index + 1}`} 
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button 
            className="absolute top-4 right-4 text-white hover:text-fuchsia-400 transition-colors z-10"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white hover:text-fuchsia-400 transition-colors"
            onClick={() => navigateImage('prev')}
          >
            <ChevronLeft size={32} />
          </button>
          
          <img 
            src={currentImage} 
            alt="Full size gallery image" 
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white hover:text-fuchsia-400 transition-colors"
            onClick={() => navigateImage('next')}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
      
      {/* Photo Shoot Info */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Behind the Images</h2>
            <div className="bg-gray-800/30 p-6 rounded-lg border border-fuchsia-500/10">
              <p className="text-gray-300 mb-4">
                Our photo gallery captures the essence of Sobre Carga - the energy of our live performances, 
                the creative process in the studio, the camaraderie backstage, and the amazing connection with our fans.
              </p>
              <p className="text-gray-300">
                All photos are taken by our dedicated photographers who travel with us to capture these special moments. 
                For professional inquiries or if you'd like to submit your own photos from our shows, please 
                contact us through the form on our Contact page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;