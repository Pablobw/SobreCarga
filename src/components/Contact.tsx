import React, { useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';
import { Mail, Phone, MapPin, Mail as Gmail, Mail as MailIcon } from 'lucide-react';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const isSectionVisible = useInView(sectionRef, { threshold: 0.1 });
  const isTitleVisible = useInView(titleRef, { threshold: 0.5 });
  const isContentVisible = useInView(contentRef, { threshold: 0.3 });
  
  const [emailProvider, setEmailProvider] = useState<string>('gmail');
  
  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const subject = encodeURIComponent('Contacto - Banda Sobrecarga');
    const body = encodeURIComponent('Hola Sobrecarga,\n\nMe gustaría contactarlos respecto a:');
    const email = 'contacto@sobrecarga.com';
    
    let mailtoUrl = '';
    
    switch (emailProvider) {
      case 'gmail':
        mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
        break;
      case 'outlook':
        mailtoUrl = `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`;
        break;
      case 'yahoo':
        mailtoUrl = `https://compose.mail.yahoo.com/?to=${email}&subject=${subject}&body=${body}`;
        break;
      default:
        mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    }
    
    window.open(mailtoUrl, '_blank');
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <h2 ref={titleRef} className={`section-title ${isTitleVisible ? 'visible' : ''}`}>
          <span className="accent">Contáctanos</span>
        </h2>
        
        <div 
          ref={contentRef} 
          className={`contact-content ${isContentVisible ? 'visible' : ''}`}
        >
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={24} className="contact-icon" />
              <p>contacto@sobrecarga.com</p>
            </div>
            
            <div className="contact-item">
              <Phone size={24} className="contact-icon" />
              <p>+56 9 1234 5678</p>
            </div>
            
            <div className="contact-item">
              <MapPin size={24} className="contact-icon" />
              <p>Santiago, Chile</p>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Escríbenos</h3>
            <p>Selecciona tu cliente de correo preferido:</p>
            
            <div className="email-providers">
              <div className={`provider-option ${emailProvider === 'gmail' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  id="gmail" 
                  name="provider" 
                  value="gmail"
                  checked={emailProvider === 'gmail'}
                  onChange={() => setEmailProvider('gmail')}
                />
                <label htmlFor="gmail">
                  <Mail size={20} />
                  Gmail
                </label>
              </div>
              
              <div className={`provider-option ${emailProvider === 'outlook' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  id="outlook" 
                  name="provider" 
                  value="outlook"
                  checked={emailProvider === 'outlook'}
                  onChange={() => setEmailProvider('outlook')}
                />
                <label htmlFor="outlook">
                  <MailIcon size={20} />
                  Outlook
                </label>
              </div>
              
              <div className={`provider-option ${emailProvider === 'yahoo' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  id="yahoo" 
                  name="provider" 
                  value="yahoo"
                  checked={emailProvider === 'yahoo'}
                  onChange={() => setEmailProvider('yahoo')}
                />
                <label htmlFor="yahoo">
                  <Mail size={20} />
                  Yahoo
                </label>
              </div>
              
              <div className={`provider-option ${emailProvider === 'default' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  id="default" 
                  name="provider" 
                  value="default"
                  checked={emailProvider === 'default'}
                  onChange={() => setEmailProvider('default')}
                />
                <label htmlFor="default">
                  <Mail size={20} />
                  Cliente predeterminado
                </label>
              </div>
            </div>
            
            <button className="contact-button" onClick={handleContactClick}>
              Contactar Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;