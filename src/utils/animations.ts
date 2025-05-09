import { useEffect, useRef, useState, MutableRefObject } from 'react';

// Hook for animating elements on scroll
export const useScrollAnimation = (options = { threshold: 0.1 }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      options
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold]);
  
  return [ref, isVisible];
};

// Hook for parallax effect
export const useParallax = (
  speed: number = 0.5
): [MutableRefObject<HTMLDivElement | null>, () => void] => {
  const ref = useRef<HTMLDivElement | null>(null);
  
  const handleScroll = () => {
    if (ref.current) {
      const scrolled = window.scrollY;
      ref.current.style.transform = `translateY(${scrolled * speed}px)`;
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return [ref, handleScroll];
};

// Helper for staggered animations
export const getStaggeredDelay = (index: number, baseDelay: number = 100): string => {
  return `${index * baseDelay}ms`;
};