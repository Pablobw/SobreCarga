import React from 'react';
import { Instagram, Facebook, Youtube, Music } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-text">SOBRECARGA</span>
            <p className="footer-tagline">Rock & Funk desde Santiago</p>
          </div>
          
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Youtube">
              <Youtube size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Spotify">
              <Music size={20} />
            </a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sobrecarga. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;