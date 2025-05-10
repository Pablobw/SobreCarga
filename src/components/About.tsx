import React, { useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const isSectionVisible = useInView(sectionRef, { threshold: 0.1 });
  const isTitleVisible = useInView(titleRef, { threshold: 0.5 });
  const isTextVisible = useInView(textRef, { threshold: 0.3 });
  const isImageVisible = useInView(imageRef, { threshold: 0.3 });
  
  useEffect(() => {
    if (isSectionVisible && sectionRef.current) {
      sectionRef.current.classList.add('visible');
    }
  }, [isSectionVisible]);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <h2 ref={titleRef} className={`section-title ${isTitleVisible ? 'visible' : ''}`}>
          <span className="accent">Sobre</span> Nosotros
        </h2>
        
        <div className="about-content">
          <div 
            ref={textRef} 
            className={`about-text ${isTextVisible ? 'visible' : ''}`}
          >
            <p>Somos una banda de rock y funk de Santiago de Chile, formada por dos músicos apasionados con un sonido único y energético que fusiona lo mejor de ambos mundos.</p>
            
            <p>Nacimos en 2023 con la visión de crear música que rompa con lo convencional, mezclando ritmos potentes de funk con la actitud del rock. Nuestra propuesta sonora se caracteriza por bajos enérgicos, baterías contundentes y melodías que invitan a moverte.</p>
            
            <p>Con apenas 5 canciones en nuestro repertorio, estamos en el inicio de nuestra aventura musical, pero con grandes ambiciones y proyectos para el futuro cercano. Nuestras letras hablan de experiencias personales, la vida en Santiago y reflexiones sobre el mundo actual.</p>
          </div>
          
          <div 
            ref={imageRef} 
            className={`about-image ${isImageVisible ? 'visible' : ''}`}
          >
            <div className="image-container">
              <img src="https://images.pexels.com/photos/167635/pexels-photo-167635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Sobrecarga - Banda de Rock/Funk" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;