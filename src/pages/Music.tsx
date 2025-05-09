import React, { useState } from 'react';
import { PlayCircle, Volume2, ExternalLink, Share2, Heart } from 'lucide-react';

const Music = () => {
  const [activeAlbum, setActiveAlbum] = useState('electrify');
  
  const albums = [
    {
      id: 'electrify',
      title: 'ELECTRIFY',
      year: '2025',
      cover: 'https://images.pexels.com/photos/167589/pexels-photo-167589.jpeg',
      description: 'Our most energetic album yet, combining heavy guitar riffs with funky basslines and powerful vocals.',
      tracks: [
        { title: 'Power Surge', duration: '3:45', isHit: true },
        { title: 'Frequency', duration: '4:12', isHit: false },
        { title: 'Amplified', duration: '3:58', isHit: false },
        { title: 'Resistance', duration: '5:21', isHit: true },
        { title: 'Current Flow', duration: '4:05', isHit: false },
        { title: 'High Voltage Love', duration: '4:37', isHit: false },
        { title: 'Short Circuit', duration: '3:29', isHit: true },
        { title: 'Wired', duration: '4:53', isHit: false },
        { title: 'Static Charge', duration: '3:48', isHit: false },
        { title: 'Full Capacity', duration: '5:15', isHit: false }
      ]
    },
    {
      id: 'circuit-breaker',
      title: 'Circuit Breaker',
      year: '2023',
      cover: 'https://images.pexels.com/photos/4722311/pexels-photo-4722311.jpeg',
      description: 'Our sophomore album explores deeper themes while maintaining our signature energetic sound.',
      tracks: [
        { title: 'Breaking Point', duration: '4:15', isHit: true },
        { title: 'Overload', duration: '3:48', isHit: false },
        { title: 'Fuse Box', duration: '4:02', isHit: true },
        { title: 'Trip Switch', duration: '3:56', isHit: false },
        { title: 'Power Cut', duration: '5:12', isHit: false },
        { title: 'Reset', duration: '4:27', isHit: true },
        { title: 'Electric Dreams', duration: '3:59', isHit: false },
        { title: 'Surge Protector', duration: '4:31', isHit: false }
      ]
    },
    {
      id: 'first-charge',
      title: 'First Charge',
      year: '2021',
      cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
      description: 'Our debut EP that introduced the world to the electrifying sound of Sobre Carga.',
      tracks: [
        { title: 'Initial Spark', duration: '3:42', isHit: true },
        { title: 'Charged Up', duration: '4:05', isHit: false },
        { title: 'Plugged In', duration: '3:38', isHit: true },
        { title: 'Potential Difference', duration: '4:47', isHit: false },
        { title: 'Circuit Completion', duration: '5:03', isHit: false }
      ]
    }
  ];
  
  const streamingPlatforms = [
    { name: 'Spotify', url: 'https://spotify.com' },
    { name: 'Apple Music', url: 'https://music.apple.com' },
    { name: 'YouTube Music', url: 'https://music.youtube.com' },
    { name: 'Amazon Music', url: 'https://music.amazon.com' },
    { name: 'Deezer', url: 'https://deezer.com' }
  ];
  
  const currentAlbum = albums.find(album => album.id === activeAlbum) || albums[0];

  return (
    <div className="pt-16">
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center">Our Music</h1>
          <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Explore our albums and tracks. Stream on your favorite platform or listen to previews right here.
          </p>
          
          {/* Album Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {albums.map(album => (
              <button
                key={album.id}
                onClick={() => setActiveAlbum(album.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeAlbum === album.id 
                    ? 'bg-fuchsia-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {album.title} ({album.year})
              </button>
            ))}
          </div>
          
          {/* Current Album Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Album Cover */}
            <div>
              <div className="bg-gray-800 p-3 rounded-lg shadow-xl">
                <img 
                  src={currentAlbum.cover} 
                  alt={`${currentAlbum.title} album cover`} 
                  className="w-full h-auto rounded-md"
                />
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-bold">{currentAlbum.title}</h2>
                <p className="text-fuchsia-400">{currentAlbum.year}</p>
                <p className="text-gray-300 mt-4">{currentAlbum.description}</p>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Listen On</h3>
                  <div className="flex flex-wrap gap-2">
                    {streamingPlatforms.map((platform, index) => (
                      <a 
                        key={index}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-colors"
                      >
                        <ExternalLink size={16} />
                        {platform.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tracklist */}
            <div className="md:col-span-2">
              <div className="bg-gray-800/30 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Volume2 className="mr-2 text-fuchsia-400" />
                  Tracklist
                </h3>
                
                <div className="space-y-4">
                  {currentAlbum.tracks.map((track, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors group"
                    >
                      <div className="text-gray-500 w-6">{index + 1}</div>
                      <div className="flex-grow ml-4">
                        <div className="flex items-center">
                          <span className="font-medium">
                            {track.title}
                          </span>
                          {track.isHit && (
                            <span className="ml-2 px-2 py-0.5 bg-fuchsia-500/20 text-fuchsia-300 text-xs rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-gray-400 mr-4">{track.duration}</div>
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-fuchsia-600/0 group-hover:bg-fuchsia-600 transition-colors"
                        aria-label={`Play ${track.title}`}
                      >
                        <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Album Actions */}
              <div className="flex justify-end gap-4 mt-6">
                <button className="text-gray-400 hover:text-fuchsia-400 transition-colors flex items-center gap-2">
                  <Share2 size={18} />
                  Share
                </button>
                <button className="text-gray-400 hover:text-fuchsia-400 transition-colors flex items-center gap-2">
                  <Heart size={18} />
                  Favorite
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Video */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Music Video
          </h2>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 rounded-xl p-1">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-black">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <p className="text-gray-300 mb-4">Our latest music video for "Power Surge" is available on YouTube</p>
                    <a 
                      href="https://youtube.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-full transition-colors"
                    >
                      <PlayCircle size={20} />
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Lyrics Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Lyrics & Songwriting</h2>
            <p className="text-gray-300 mb-8">
              Our lyrics explore themes of power, energy, and human connections - mirroring the electric 
              nature of our sound. We draw inspiration from personal experiences, social observations, 
              and the unique energy of live performances.
            </p>
            
            <div className="bg-gray-800/30 p-6 rounded-lg border border-fuchsia-500/10 text-left italic">
              <p className="text-gray-300 mb-4">
                "In the surge of the moment<br />
                Electricity flowing through my veins<br />
                Connected to something greater<br />
                More than just the sum of what remains"
              </p>
              <p className="text-right text-fuchsia-400 font-normal">— From "Power Surge" (2025)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Music;