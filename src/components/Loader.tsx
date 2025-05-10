import React, { useEffect, useState } from 'react';

export const Loader = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <h1 className="font-['Permanent_Marker'] text-5xl md:text-7xl mb-8 animate-text-glow">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400">
          SOBRECARGA
        </span>
      </h1>
      
      <div className="w-64 h-3 bg-gray-800 rounded-full mb-4 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full"
          style={{ width: `${progress}%`, transition: 'width 0.1s ease-out' }}
        ></div>
      </div>
      
      <p className="text-white text-sm">Cargando experiencia... {progress}%</p>
    </div>
  );
};