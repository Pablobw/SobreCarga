import { useState, useEffect, RefObject } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
}

export const useInView = (
  elementRef: RefObject<Element>,
  options: Options = { threshold: 0 }
): boolean => {
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: options.threshold || 0,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options.threshold, options.rootMargin]);

  return isInView;
};