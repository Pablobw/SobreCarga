import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Lista simulada de canciones
const songList = [
  { id: 1, title: "Da Lo Mismo", duration: "3:45", logo: "/public/images/DaLoMismo.png" },
  { id: 2, title: "No Es Un Juego", duration: "4:12", logo: "/public/images/NoEsUnJuego.png" },
  { id: 3, title: "Tus Ojos", duration: "3:28", logo: "/public/images/DaLoMismo2.png" }
];

const Music = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // URLs de demos para representar las canciones (usamos la misma para todas como ejemplo)
  const audioUrl = "https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3";

  useEffect(() => {
    // Crear un elemento de audio
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      
      // Actualizar el progreso mientras se reproduce
      audioRef.current.addEventListener('timeupdate', updateProgress);
      
      // Cuando termina la canción
      audioRef.current.addEventListener('ended', handleSongEnd);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('ended', handleSongEnd);
        audioRef.current.pause();
      }
    };
  }, []);

  // Actualizar la URL de audio cuando cambia la canción
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  const updateProgress = () => {
    if (audioRef.current) {
      const value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(value || 0);
    }
  };

  const handleSongEnd = () => {
    if (currentSong < songList.length - 1) {
      setCurrentSong(currentSong + 1);
    } else {
      setCurrentSong(0);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentSong((prev) => (prev === songList.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSong((prev) => (prev === 0 ? songList.length - 1 : prev - 1));
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newValue = parseFloat(e.target.value);
      const newTime = (newValue / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(newValue);
    }
  };

  const playSong = (index: number) => {
    setCurrentSong(index);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <section 
      id="musica" 
      className="py-20 relative bg-gradient-to-b from-purple-900/30 to-black"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={`mb-12 transition-all duration-700 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
              <span className="font-['Permanent_Marker'] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Nuestra Música
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto mb-8"></div>
          </div>

          <div className={`bg-black/60 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl shadow-pink-600/20 transition-all duration-700 delay-200 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Reproductor de música custom */}
            <div className="p-6 md:p-8">
              {/* Cover y controles principales */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center mb-8">
                <div className="w-full max-w-[220px] h-[220px] mx-auto relative group flex items-center justify-center bg-black/80 rounded-xl shadow-lg overflow-hidden">
                  <img 
                    src={songList[currentSong].logo}
                    alt={`Logo de ${songList[currentSong].title}`}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={togglePlay}
                      className="w-16 h-16 flex items-center justify-center rounded-full bg-pink-500/80 text-white hover:bg-pink-500 transition-colors duration-300"
                    >
                      {isPlaying ? <Pause size={30} /> : <Play size={30} />}
                    </button>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {songList[currentSong].title}
                  </h3>
                  <p className="text-gray-400 mb-6">Sobrecarga</p>
                  
                  {/* Barra de progreso */}
                  <div className="mb-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={progress} 
                      onChange={handleProgressChange}
                      className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500"
                    />
                  </div>
                  
                  {/* Controles */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={handlePrev}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <SkipBack size={24} />
                      </button>
                      <button 
                        onClick={togglePlay}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-200"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      <button 
                        onClick={handleNext}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <SkipForward size={24} />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Volume2 size={18} className="text-gray-400" />
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        defaultValue="80"
                        className="w-20 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Lista de canciones */}
              <div className="mt-8">
                <h4 className="text-lg font-bold text-white mb-4">Lista de canciones</h4>
                <div className="space-y-1">
                  {songList.map((song, index) => (
                    <div 
                      key={song.id}
                      onClick={() => playSong(index)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        currentSong === index 
                          ? 'bg-gradient-to-r from-pink-500/20 to-transparent border-l-4 border-pink-500' 
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`w-6 text-center ${currentSong === index ? 'text-pink-500' : 'text-gray-500'}`}>
                          {currentSong === index && isPlaying ? (
                            <div className="flex gap-0.5 items-end h-4 justify-center">
                              <div className="w-1 bg-pink-500 animate-soundbar" style={{ animationDelay: '0ms', height: '100%' }}></div>
                              <div className="w-1 bg-pink-500 animate-soundbar" style={{ animationDelay: '200ms', height: '70%' }}></div>
                              <div className="w-1 bg-pink-500 animate-soundbar" style={{ animationDelay: '400ms', height: '40%' }}></div>
                              <div className="w-1 bg-pink-500 animate-soundbar" style={{ animationDelay: '600ms', height: '100%' }}></div>
                            </div>
                          ) : (
                            index + 1
                          )}
                        </span>
                        <span className={`font-medium ${currentSong === index ? 'text-white' : 'text-gray-300'}`}>
                          {song.title}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">{song.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Music;