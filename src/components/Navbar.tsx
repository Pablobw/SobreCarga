import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  scrollPosition: number;
}

const Navbar: React.FC<NavbarProps> = ({ scrollPosition }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = scrollPosition > 50;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo" onClick={() => scrollToSection('hero')}>
          <span className="logo-text">SOBRECARGA</span>
        </div>
        
        <div className="desktop-menu">
          <ul className="nav-links">
            <li onClick={() => scrollToSection('hero')}>Inicio</li>
            <li onClick={() => scrollToSection('about')}>Nosotros</li>
            <li onClick={() => scrollToSection('music')}>Música</li>
            <li onClick={() => scrollToSection('gallery')}>Fotos</li>
            <li onClick={() => scrollToSection('contact')}>Contacto</li>
          </ul>
        </div>
        
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-links">
            <li onClick={() => scrollToSection('hero')}>Inicio</li>
            <li onClick={() => scrollToSection('about')}>Nosotros</li>
            <li onClick={() => scrollToSection('music')}>Música</li>
            <li onClick={() => scrollToSection('gallery')}>Fotos</li>
            <li onClick={() => scrollToSection('contact')}>Contacto</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;