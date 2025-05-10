import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface Song {
  id: number;
  title: string;
  length: string;
  cover: string;
}

const Music: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  const isSectionVisible = useInView(sectionRef, { threshold: 0.1 });
  const isTitleVisible = useInView(titleRef, { threshold: 0.5 });
  const isPlayerVisible = useInView(playerRef, { threshold: 0.3 });
  
  const [currentSong, setCurrentSong] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(80);
  
  // Example song data - in a real app you'd fetch this
  const songs: Song[] = [
    { id: 1, title: "Circuitos", length: "3:45", cover: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 2, title: "Santiago Nocturno", length: "4:12", cover: "https://images.pexels.com/photos/1666816/pexels-photo-1666816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 3, title: "Frecuencia Rebelde", length: "3:58", cover: "https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 4, title: "Conexión Funk", length: "4:30", cover: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { id: 5, title: "Fusión Eléctrica", length: "3:22", cover: "https://images.pexels.com/photos/3071883/pexels-photo-3071883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
  ];
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // In a real application, you would have actual audio files
    // Since we don't have real audio files, we'll simulate playback
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);
  
  // Reset progress when changing songs
  useEffect(() => {
    setProgress(0);
  }, [currentSong]);
  
  useEffect(() => {
    if (isSectionVisible && sectionRef.current) {
      sectionRef.current.classList.add('visible');
    }
  }, [isSectionVisible]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const nextSong = () => {
    setCurrentSong(prev => (prev + 1) % songs.length);
    setProgress(0);
    setIsPlaying(true);
  };
  
  const prevSong = () => {
    setCurrentSong(prev => (prev - 1 + songs.length) % songs.length);
    setProgress(0);
    setIsPlaying(true);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value);
    setProgress(newProgress);
  };
  
  const formatTime = (percentage: number) => {
    // This is a simulation since we don't have real audio
    const songDuration = 240; // 4 minutes in seconds
    const currentSeconds = Math.floor((percentage / 100) * songDuration);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section id="music" className="music" ref={sectionRef}>
      <div className="container">
        <h2 ref={titleRef} className={`section-title ${isTitleVisible ? 'visible' : ''}`}>
          <span className="accent">Nuestra</span> Música
        </h2>
        
        <div 
          ref={playerRef} 
          className={`music-player ${isPlayerVisible ? 'visible' : ''}`}
        >
          <div className="current-song">
            <img 
              src={songs[currentSong].cover} 
              alt={songs[currentSong].title} 
              className="song-cover"
            />
            <div className="song-info">
              <h3 className="song-title">{songs[currentSong].title}</h3>
              <p className="song-length">{songs[currentSong].length}</p>
            </div>
          </div>
          
          <div className="player-controls">
            <div className="main-controls">
              <button className="control-button" onClick={prevSong}>
                <SkipBack size={24} />
              </button>
              
              <button className="play-button" onClick={togglePlay}>
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>
              
              <button className="control-button" onClick={nextSong}>
                <SkipForward size={24} />
              </button>
            </div>
            
            <div className="progress-container">
              <span className="time">{formatTime(progress)}</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={progress} 
                className="progress-bar"
                onChange={handleProgressChange}
              />
              <span className="time">{songs[currentSong].length}</span>
            </div>
            
            <div className="volume-container">
              <Volume2 size={18} />
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume} 
                className="volume-slider"
                onChange={handleVolumeChange}
              />
            </div>
          </div>
        </div>
        
        <div className="song-list">
          <h3 className="list-title">Nuestras Canciones</h3>
          <ul>
            {songs.map((song, index) => (
              <li 
                key={song.id} 
                className={`song-item ${currentSong === index ? 'active' : ''}`}
                onClick={() => {
                  setCurrentSong(index);
                  setIsPlaying(true);
                  setProgress(0);
                }}
              >
                <span className="song-number">{index + 1}</span>
                <span className="song-title">{song.title}</span>
                <span className="song-duration">{song.length}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Music;