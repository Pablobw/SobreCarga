import React, { useEffect, useRef } from 'react';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  animation?: 'fadeIn' | 'scaleIn' | 'rotateIn' | 'slideInLeft' | 'slideInRight';
  delay?: number;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({ 
  src, 
  alt, 
  className = '',
  animation = 'fadeIn',
  delay = 0
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (imageRef.current) {
              imageRef.current.style.animationDelay = `${delay}ms`;
              imageRef.current.classList.add(`animate-${animation}`);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [animation, delay]);
  
  return (
    <img 
      ref={imageRef}
      src={src} 
      alt={alt} 
      className={`opacity-0 ${className}`}
      loading="lazy"
    />
  );
};

export default AnimatedImage;