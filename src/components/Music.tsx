import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { RiSoundcloudLine } from "react-icons/ri";



// Clase para analizar audio en tiempo real
class AudioAnalyzer {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private source: MediaElementAudioSourceNode | null = null;

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    } catch {
      console.log('Web Audio API no soportada');
    }
  }

  connectAudio(audioElement: HTMLAudioElement) {
    if (!this.audioContext || !this.analyser) return;

    try {
      this.source = this.audioContext.createMediaElementSource(audioElement);
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    } catch (error) {
      console.log('Error conectando audio:', error);
    }
  }

  getFrequencyData(): number[] {
    if (!this.analyser || !this.dataArray) return new Array(128).fill(0);

    this.analyser.getByteFrequencyData(this.dataArray);
    return Array.from(this.dataArray);
  }

  getAverageVolume(): number {
    const frequencies = this.getFrequencyData();
    return frequencies.reduce((sum, freq) => sum + freq, 0) / frequencies.length;
  }

  getBassLevel(): number {
    const frequencies = this.getFrequencyData();
    // Tomar las primeras 10 frecuencias (bajos)
    const bassFrequencies = frequencies.slice(0, 10);
    return bassFrequencies.reduce((sum, freq) => sum + freq, 0) / bassFrequencies.length;
  }

  getTrebleLevel(): number {
    const frequencies = this.getFrequencyData();
    // Tomar las últimas 30 frecuencias (agudos)
    const trebleFrequencies = frequencies.slice(-30);
    return trebleFrequencies.reduce((sum, freq) => sum + freq, 0) / trebleFrequencies.length;
  }
}

const songList = [
  { id: 1, title: "Da Lo Mismo", duration: "4:28", logo: "/images/DaLoMismo.png", audio: "/audios/da-lo-mismo.mp3" },
  { id: 2, title: "No Es Un Juego", duration: "3:08", logo: "/images/NoEsUnJuego.png", audio: "/audios/no-es-un-juego.mp3" },
  { id: 3, title: "Tus Ojos", duration: "4:23", logo: "/images/TusOjos.png", audio: "/audios/tus-ojos.mp3" },
  { id: 4, title: "Si Tu Voz Se Olvida", duration: "3:14", logo: "/images/situvozseolvida.jpg", audio: "/audios/si-tu-voz-se-olvida.mp3" },
  { id: 5, title: "Quisiera Estar", duration: "2:27", logo: "/images/QuisieraEstar.png", audio: "/audios/quisiera-estar.mp3" }
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
  
  // Estados para el análisis de audio
  const [audioData, setAudioData] = useState({
    averageVolume: 0,
    bassLevel: 0,
    trebleLevel: 0,
    frequencies: new Array(128).fill(0)
  });
  const audioAnalyzerRef = useRef<AudioAnalyzer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Función para inicializar el analizador de audio
  const initAudioAnalyzer = useCallback(() => {
    if (!audioRef.current) return;
    
    if (!audioAnalyzerRef.current) {
      audioAnalyzerRef.current = new AudioAnalyzer();
    }
    
    audioAnalyzerRef.current.connectAudio(audioRef.current);
  }, []);

  // Función para actualizar los datos de audio
  const updateAudioData = useCallback(() => {
    if (!audioAnalyzerRef.current || !isPlaying) {
      setAudioData({
        averageVolume: 0,
        bassLevel: 0,
        trebleLevel: 0,
        frequencies: new Array(128).fill(0)
      });
      return;
    }

    const averageVolume = audioAnalyzerRef.current.getAverageVolume();
    const bassLevel = audioAnalyzerRef.current.getBassLevel();
    const trebleLevel = audioAnalyzerRef.current.getTrebleLevel();
    const frequencies = audioAnalyzerRef.current.getFrequencyData();

    setAudioData({
      averageVolume,
      bassLevel,
      trebleLevel,
      frequencies
    });

    animationFrameRef.current = requestAnimationFrame(updateAudioData);
  }, [isPlaying]);
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
        // Inicializar analizador cuando empiece a reproducir
        initAudioAnalyzer();
        // Comenzar el análisis de audio
        updateAudioData();
      } else {
        audioRef.current.pause();
        // Detener el análisis cuando se pause
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }
    }
  }, [isPlaying, initAudioAnalyzer, updateAudioData]);

  // Limpiar recursos cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

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
            <div className="flex justify-center mt-4">
              <a
                href="https://on.soundcloud.com/4k5zJB6jhddZWHAP7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold shadow-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                title="Escuchar más en SoundCloud"
              >
                <span>Escuchar en SoundCloud</span>
                <RiSoundcloudLine size={22} />
              </a>
            </div>
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
                <div className="w-full max-w-[180px] sm:max-w-[220px] h-[180px] sm:h-[220px] mx-auto relative group flex items-center justify-center bg-black/80 rounded-xl shadow-lg overflow-hidden" key={`album-${currentSong}`}>
                  <img 
                    src={songList[currentSong].logo}
                    alt={`Logo de ${songList[currentSong].title}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />

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
                      className="w-full h-1 bg-gray-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-400 [&::-webkit-slider-track]:bg-gray-800 [&::-webkit-slider-track]:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                      style={{
                        background: `linear-gradient(to right, #9ca3af ${progress}%, #1f2937 ${progress}%)`
                      }}
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
                        if (currentSong === index) {
                          setIsPlaying(!isPlaying);
                        } else {
                          setCurrentSong(index);
                          setIsPlaying(true);
                        }
                      }}
                      className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
                        currentSong === index 
                          ? `bg-pink-500/20 text-white ${isPlaying ? 'playing-glitch' : ''}` 
                          : 'hover:bg-white/5 text-gray-400 hover:text-white'
                      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500`}
                      style={
                        currentSong === index && isPlaying
                          ? {
                              boxShadow: `0 0 ${Math.max(5, audioData.averageVolume / 10)}px rgba(255, 0, 255, ${Math.min(0.8, audioData.averageVolume / 100)}), 0 0 ${Math.max(10, audioData.averageVolume / 5)}px rgba(0, 255, 255, ${Math.min(0.6, audioData.averageVolume / 150)})`,
                            }
                          : {}
                      }
                    >
                      <div className="w-10 h-10 flex items-center justify-center">
                        {currentSong === index && isPlaying ? (
                          <div className="flex items-center gap-0.5">
                            <div className="w-1 h-3 bg-pink-500 rounded-full animate-soundbar"></div>
                            <div className="w-1 h-3 bg-pink-500 rounded-full animate-soundbar" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1 h-3 bg-pink-500 rounded-full animate-soundbar" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        ) : currentSong === index && !isPlaying ? (
                          <div className="w-6 h-6 flex items-center justify-center">
                            <Play size={16} className="text-pink-500" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img 
                              src={song.logo}
                              alt={`Logo de ${song.title}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h5 
                          className={`font-medium ${currentSong === index && isPlaying ? 'playing-glitch-text' : ''}`} 
                          data-text={song.title}
                          style={
                            currentSong === index && isPlaying
                              ? {
                                  textShadow: `0 0 ${Math.max(5, audioData.trebleLevel / 10)}px rgba(255, 0, 255, ${Math.min(0.8, audioData.trebleLevel / 100)}), 0 0 ${Math.max(10, audioData.trebleLevel / 5)}px rgba(0, 255, 255, ${Math.min(0.6, audioData.trebleLevel / 150)})`,
                                }
                              : {}
                          }
                        >
                          {song.title}
                        </h5>
                        <p className="text-sm opacity-75">Sobrecarga</p>
                      </div>
                                              <span className="text-sm">{song.duration}</span>
                        {currentSong === index && isPlaying && (
                          <>
                            {/* Ondas continuas que se expanden desde el centro */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                              {/* Definiciones de gradientes SVG */}
                              <svg width="0" height="0" className="absolute">
                                <defs>
                                  <linearGradient id={`waveGradient1-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(255, 0, 255, 0.6)" />
                                    <stop offset="50%" stopColor="rgba(0, 255, 255, 0.5)" />
                                    <stop offset="100%" stopColor="rgba(255, 0, 255, 0.6)" />
                                  </linearGradient>
                                  <linearGradient id={`waveGradient2-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(0, 255, 255, 0.5)" />
                                    <stop offset="50%" stopColor="rgba(255, 0, 255, 0.4)" />
                                    <stop offset="100%" stopColor="rgba(0, 255, 255, 0.5)" />
                                  </linearGradient>
                                  <linearGradient id={`waveGradient3-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(255, 0, 255, 0.4)" />
                                    <stop offset="50%" stopColor="rgba(0, 255, 255, 0.3)" />
                                    <stop offset="100%" stopColor="rgba(255, 0, 255, 0.4)" />
                                  </linearGradient>
                                </defs>
                              </svg>
                              
                              {/* Ondas continuas que responden al audio */}
                              <div className="relative w-full h-full flex items-center justify-center">
                                {/* Primera capa - ondas de mar lentas (bajos) */}
                                <div
                                  className="absolute rounded-full border-2 border-pink-500/40"
                                  style={{
                                    width: `${Math.max(20, audioData.bassLevel / 3)}px`,
                                    height: `${Math.max(20, audioData.bassLevel / 3)}px`,
                                    animation: `wave-expand-1 ${Math.max(2, 4 - audioData.bassLevel / 50)}s ease-out infinite`,
                                    animationDelay: '0s'
                                  }}
                                />
                                
                                {/* Segunda capa - ondas de mar medias (volumen promedio) */}
                                <div
                                  className="absolute rounded-full border-2 border-cyan-500/40"
                                  style={{
                                    width: `${Math.max(30, audioData.averageVolume / 2)}px`,
                                    height: `${Math.max(30, audioData.averageVolume / 2)}px`,
                                    animation: `wave-expand-2 ${Math.max(1.5, 3 - audioData.averageVolume / 60)}s ease-out infinite`,
                                    animationDelay: '0.5s'
                                  }}
                                />
                                
                                {/* Tercera capa - ondas de mar rápidas (agudos) */}
                                <div
                                  className="absolute rounded-full border-2 border-pink-500/30"
                                  style={{
                                    width: `${Math.max(40, audioData.trebleLevel / 1.5)}px`,
                                    height: `${Math.max(40, audioData.trebleLevel / 1.5)}px`,
                                    animation: `wave-expand-3 ${Math.max(1, 2.5 - audioData.trebleLevel / 70)}s ease-out infinite`,
                                    animationDelay: '1s'
                                  }}
                                />
                                
                                {/* Ondas adicionales que aparecen con sonidos fuertes */}
                                {audioData.averageVolume > 120 && Array.from({ length: 2 }, (_, i) => (
                                  <div
                                    key={`extra-wave-${i}`}
                                    className="absolute rounded-full border border-cyan-500/50"
                                    style={{
                                      width: `${Math.max(50, audioData.averageVolume / 1.5)}px`,
                                      height: `${Math.max(50, audioData.averageVolume / 1.5)}px`,
                                      animation: `wave-expand-extra ${Math.max(1, 3 - audioData.averageVolume / 80)}s ease-out infinite`,
                                      animationDelay: `${1.5 + i * 0.3}s`
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </>
                        )}
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