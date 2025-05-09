import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  autoplaySpeed?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  autoplaySpeed = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  useEffect(() => {
    // Only start autoplay if not hovering
    if (!isHovering) {
      intervalRef.current = window.setInterval(nextSlide, autoplaySpeed);
    }
    
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplaySpeed, isHovering, images.length]);
  
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    intervalRef.current = window.setInterval(nextSlide, autoplaySpeed);
  };

  return (
    <div 
      className="relative overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="min-w-full h-full"
          >
            <img 
              src={image} 
              alt={`Gallery image ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button 
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white transition-colors z-10 opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white transition-colors z-10 opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-fuchsia-500' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;