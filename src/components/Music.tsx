import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const songList = [
  { id: 1, title: "Da Lo Mismo", duration: "3:45", logo: "/images/DaLoMismo.png", audio: "/audios/da-lo-mismo.mp3" },
  { id: 2, title: "No Es Un Juego", duration: "4:12", logo: "/images/NoEsUnJuego.png", audio: "/audios/no-es-un-juego.mp3" },
  { id: 3, title: "Tus Ojos", duration: "3:28", logo: "/images/TusOjos.png", audio: "/audios/tus-ojos.mp3" }
];

const Music = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [volume, setVolume] = useState(0.8);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const lastBackClick = useRef<number>(0);
  const backClickTimeout = useRef<number | null>(null);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
      setProgress((audioRef.current.currentTime / (audioRef.current.duration || 1)) * 100);
    }
  }, []);
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  }, []);
  const handleSongEnd = useCallback(() => {
    if (currentSong < songList.length - 1) {
      setCurrentSong(currentSong + 1);
      setIsPlaying(true);
    } else {
      setCurrentSong(0);
      setIsPlaying(false);
    }
  }, [currentSong]);

  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newValue = parseFloat(e.target.value);
      const newTime = (newValue / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(newValue);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
  };

  const handlePrev = () => {
    const now = Date.now();
    if (now - lastBackClick.current < 600) {
      setCurrentSong((prev) => (prev === 0 ? songList.length - 1 : prev - 1));
      setIsPlaying(true);
      if (backClickTimeout.current) clearTimeout(backClickTimeout.current);
    } else {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setIsPlaying(true);
      }
      backClickTimeout.current = setTimeout(() => {
        backClickTimeout.current = null;
      }, 600);
    }
    lastBackClick.current = now;
  };

  return (
    <section 
      id="musica" 
      className="py-20 relative bg-gradient-to-b from-purple-900/30 to-black"
      ref={ref}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={`mb-12 transition-all duration-700 transform will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
              <span className="font-['Permanent_Marker'] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Nuestra Música
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto mb-8"></div>
          </div>

          <div className={`bg-black/60 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl shadow-pink-600/20 transition-all duration-700 delay-200 transform will-change-transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="p-4 sm:p-6 md:p-8">
              <audio
                ref={audioRef}
                src={songList[currentSong].audio}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleSongEnd}
                style={{ display: 'none' }}
                preload="auto"
              />
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center mb-8">
                <div className="w-full max-w-[180px] sm:max-w-[220px] h-[180px] sm:h-[220px] mx-auto relative group flex items-center justify-center bg-black/80 rounded-xl shadow-lg overflow-hidden">
                  <img 
                    src={songList[currentSong].logo}
                    alt={`Logo de ${songList[currentSong].title}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center rounded-full bg-pink-500/80 text-white hover:bg-pink-500 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                      aria-label={isPlaying ? "Pausar" : "Reproducir"}
                    >
                      {isPlaying ? <Pause size={24} className="sm:w-8 sm:h-8" /> : <Play size={24} className="sm:w-8 sm:h-8" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {songList[currentSong].title}
                  </h3>
                  <p className="text-gray-400 mb-4 sm:mb-6">Sobrecarga</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={progress} 
                      onChange={handleProgressChange}
                      className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <button 
                        onClick={handlePrev}
                        className="text-gray-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full p-1"
                        aria-label="Canción anterior"
                      >
                        <SkipBack size={20} className="sm:w-6 sm:h-6" />
                      </button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                        aria-label={isPlaying ? "Pausar" : "Reproducir"}
                      >
                        {isPlaying ? <Pause size={16} className="sm:w-5 sm:h-5" /> : <Play size={16} className="sm:w-5 sm:h-5" />}
                      </button>
                      <button 
                        onClick={() => setCurrentSong((prev) => (prev === songList.length - 1 ? 0 : prev + 1))}
                        className="text-gray-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full p-1"
                        aria-label="Siguiente canción"
                      >
                        <SkipForward size={20} className="sm:w-6 sm:h-6" />
                      </button>
                    </div>
                    
                    <div className="relative flex items-center gap-2">
                      <button
                        onClick={() => setIsVolumeVisible(!isVolumeVisible)}
                        className="text-gray-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full p-1"
                        aria-label="Control de volumen"
                      >
                        <Volume2 size={18} className="sm:w-5 sm:h-5" />
                      </button>
                      <div className={`absolute right-0 bottom-full mb-2 p-2 bg-black/80 rounded-lg shadow-lg transition-all duration-300 transform origin-bottom-right ${isVolumeVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={volume * 100}
                          onChange={handleVolumeChange}
                          className="w-20 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-bold text-white mb-4">Lista de canciones</h4>
                <div className="space-y-1">
                  {songList.map((song, index) => (
                    <button
                      key={song.id}
                      onClick={() => {
                        setCurrentSong(index);
                        setIsPlaying(true);
                      }}
                      className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
                        currentSong === index 
                          ? 'bg-pink-500/20 text-white' 
                          : 'hover:bg-white/5 text-gray-400 hover:text-white'
                      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500`}
                    >
                      <div className="w-10 h-10 flex items-center justify-center">
                        {currentSong === index && isPlaying ? (
                          <div className="flex items-center gap-0.5">
                            <div className="w-1 h-3 bg-pink-500 rounded-full animate-soundbar"></div>
                            <div className="w-1 h-3 bg-pink-500 rounded-full animate-soundbar" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1 h-3 bg-pink-500 rounded-full animate-soundbar" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h5 className="font-medium">{song.title}</h5>
                        <p className="text-sm opacity-75">Sobrecarga</p>
                      </div>
                      <span className="text-sm">{song.duration}</span>
                    </button>
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