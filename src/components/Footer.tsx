import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, AlignJustify as Spotify, Music, Mail, Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white pt-12 pb-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and tag line */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-6 w-6 text-fuchsia-500" />
              <span className="text-xl font-bold text-fuchsia-500">SOBRE CARGA</span>
            </div>
            <p className="text-gray-400 max-w-xs text-center md:text-left">
              Energizing the world with our fusion of rock and funk since 2020.
            </p>
          </div>
          
          {/* Quick links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 inline-block border-b-2 border-fuchsia-500 pb-1">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <a href="/" className="text-gray-400 hover:text-fuchsia-400 transition-colors">Home</a>
              <a href="/about" className="text-gray-400 hover:text-fuchsia-400 transition-colors">About</a>
              <a href="/music" className="text-gray-400 hover:text-fuchsia-400 transition-colors">Music</a>
              <a href="/gallery" className="text-gray-400 hover:text-fuchsia-400 transition-colors">Gallery</a>
              <a href="/contact" className="text-gray-400 hover:text-fuchsia-400 transition-colors">Contact</a>
            </div>
          </div>
          
          {/* Contact info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 inline-block border-b-2 border-fuchsia-500 pb-1">
              Connect With Us
            </h3>
            <a 
              href="mailto:info@sobrecarga.com" 
              className="text-gray-400 hover:text-fuchsia-400 transition-colors flex items-center gap-2 mb-2"
            >
              <Mail className="h-4 w-4" /> info@sobrecarga.com
            </a>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-400 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-400 transition-colors">
                <Spotify className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 mt-6 text-center">
          <p className="text-gray-500">
            © {currentYear} Sobre Carga. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;