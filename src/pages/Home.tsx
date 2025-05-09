import React, { useEffect, useRef } from 'react';
import { PlayCircle, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedImage from '../components/AnimatedImage';

const Home = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const upcomingShow = {
    date: "JULY 28, 2025",
    venue: "Rock Revolution Festival",
    location: "Ciudad de México",
    time: "9:00 PM",
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-fuchsia-900/40 to-black z-10"></div>
        
        {/* Background Image with Parallax */}
        <div 
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg')`,
            height: '120%',
            top: '-10%'
          }}
        ></div>
        
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wider animate-slideInLeft">
            SOBRE<span className="text-fuchsia-500">CARGA</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl animate-slideInRight animation-delay-300">
            Unleashing the powerful fusion of rock and funk
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fadeIn animation-delay-500">
            <Link 
              to="/music" 
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all transform hover:scale-110"
            >
              <PlayCircle size={20} className="animate-pulse" />
              Listen Now
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white hover:border-fuchsia-400 text-white hover:text-fuchsia-400 px-6 py-3 rounded-full transition-all transform hover:scale-110"
            >
              Book Us
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-float">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
      
      {/* Featured Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <h2 className="text-3xl font-bold mb-6 relative inline-block">
                <span className="relative z-10">Latest Album</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-fuchsia-500"></span>
              </h2>
              <h3 className="text-4xl font-bold mb-4 text-fuchsia-400">ELECTRIFY</h3>
              <p className="text-gray-300 mb-6">
                Our most energetic album yet, combining heavy guitar riffs with funky basslines and powerful vocals.
                Experience the raw energy and emotion that defines Sobre Carga.
              </p>
              <Link 
                to="/music" 
                className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 font-medium group"
              >
                Stream the album 
                <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className="animate-scaleIn animation-delay-300">
              <div className="rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <AnimatedImage 
                  src="https://images.pexels.com/photos/167589/pexels-photo-167589.jpeg" 
                  alt="Album Cover - Electrify" 
                  animation="rotateIn"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Show */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-fuchsia-500/20 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-6">
              <Calendar className="text-fuchsia-400 h-8 w-8 animate-bounce" />
              <h2 className="text-3xl font-bold">Next Show</h2>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="animate-slideInLeft">
                <div className="text-fuchsia-400 text-xl font-bold mb-2">{upcomingShow.date}</div>
                <h3 className="text-2xl font-bold mb-1">{upcomingShow.venue}</h3>
                <div className="text-gray-300">{upcomingShow.location} • {upcomingShow.time}</div>
              </div>
              <Link 
                to="/contact" 
                className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-full whitespace-nowrap transition-all transform hover:scale-110 animate-pulse"
              >
                Get Tickets
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Preview */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slideUp">
            <h2 className="text-3xl font-bold mb-4">
              <span className="relative">
                Moments on Stage
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-fuchsia-500"></span>
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Catch a glimpse of our energetic performances and behind-the-scenes moments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnimatedImage 
              src="https://images.pexels.com/photos/1656062/pexels-photo-1656062.jpeg" 
              alt="Live performance" 
              animation="slideInLeft"
              className="w-full h-64 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
            />
            <AnimatedImage 
              src="https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg" 
              alt="Band rehearsal" 
              animation="scaleIn"
              delay={200}
              className="w-full h-64 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
            />
            <AnimatedImage 
              src="https://images.pexels.com/photos/3382292/pexels-photo-3382292.jpeg" 
              alt="Concert with crowd" 
              animation="slideInRight"
              delay={400}
              className="w-full h-64 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/gallery" 
              className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 font-medium group animate-fadeIn animation-delay-700"
            >
              View all photos 
              <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;