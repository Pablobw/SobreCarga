import React from 'react';
import { Music, Award, Zap } from 'lucide-react';

const About = () => {
  const bandMembers = [
    {
      name: "Carlos Rodriguez",
      role: "Lead Vocals / Guitar",
      bio: "Carlos brings raw energy and powerful vocals to the stage. With over 10 years of musical experience, he founded Sobre Carga with a vision to blend rock and funk in innovative ways.",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
    },
    {
      name: "Lucia Martinez",
      role: "Bass / Backing Vocals",
      bio: "Lucia's funk-inspired basslines are the backbone of Sobre Carga's sound. Her groove-heavy style and impeccable timing create the perfect foundation for the band's energetic performances.",
      image: "https://images.pexels.com/photos/3454298/pexels-photo-3454298.jpeg"
    },
    {
      name: "Diego Fernandez",
      role: "Lead Guitar",
      bio: "Diego's blistering solos and creative riffs bring a distinctive edge to the band. His technical prowess and passion for experimentation have helped shape the unique Sobre Carga sound.",
      image: "https://images.pexels.com/photos/7104472/pexels-photo-7104472.jpeg"
    },
    {
      name: "Sofia Morales",
      role: "Drums",
      bio: "Sofia's dynamic drumming combines power and precision. Her ability to seamlessly blend rock intensity with funk rhythms creates the perfect backdrop for Sobre Carga's musical journey.",
      image: "https://images.pexels.com/photos/695963/pexels-photo-695963.jpeg"
    }
  ];

  const milestones = [
    { year: "2020", event: "Band formed in Ciudad de México" },
    { year: "2021", event: "Released debut EP 'First Charge'" },
    { year: "2022", event: "First national tour across Mexico" },
    { year: "2023", event: "Released full album 'Circuit Breaker'" },
    { year: "2024", event: "International tour in Latin America" },
    { year: "2025", event: "Latest album 'ELECTRIFY' released" }
  ];

  return (
    <div className="pt-16">
      {/* Band Story Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-2">About <span className="text-fuchsia-500">Sobre Carga</span></h1>
                <div className="h-1 w-20 bg-fuchsia-500 rounded-full mb-6"></div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Formed in 2020 in the vibrant music scene of Ciudad de México, Sobre Carga emerged with a 
                  mission to blend the raw energy of rock with the infectious grooves of funk.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  What started as jam sessions between friends quickly evolved into a powerful musical 
                  force that has been electrifying audiences across Latin America. Our name, which translates 
                  to "overload" in English, represents the surge of energy and emotion we bring to every performance.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  With three successful releases under our belt and countless energetic live shows, 
                  we continue to push the boundaries of rock and funk fusion, creating a sound that's 
                  uniquely ours while paying homage to our musical influences.
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg" 
                    alt="Band performance" 
                    className="w-full h-auto transform hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="rounded-lg overflow-hidden mt-8">
                  <img 
                    src="https://images.pexels.com/photos/8412414/pexels-photo-8412414.jpeg" 
                    alt="Band in studio" 
                    className="w-full h-auto transform hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/1238983/pexels-photo-1238983.jpeg" 
                    alt="Rehearsal session" 
                    className="w-full h-auto transform hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="rounded-lg overflow-hidden mt-8">
                  <img 
                    src="https://images.pexels.com/photos/1709800/pexels-photo-1709800.jpeg" 
                    alt="Live concert" 
                    className="w-full h-auto transform hover:scale-105 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Band Philosophy */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Music className="h-12 w-12 text-fuchsia-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Our Musical Philosophy</h2>
            <p className="text-xl text-gray-300 italic mb-8 leading-relaxed">
              "We believe music should be an experience that moves both body and soul. By fusing the
              energy of rock with the groove of funk, we create something that gets you moving while
              telling stories that matter. Every note we play is charged with purpose."
            </p>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-fuchsia-500 font-bold text-4xl mb-2">3</div>
                <div className="text-gray-400">Albums Released</div>
              </div>
              <div className="text-center">
                <div className="text-fuchsia-500 font-bold text-4xl mb-2">100+</div>
                <div className="text-gray-400">Live Shows</div>
              </div>
              <div className="text-center">
                <div className="text-fuchsia-500 font-bold text-4xl mb-2">5</div>
                <div className="text-gray-400">Countries Toured</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Band Members */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet the Band</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bandMembers.map((member, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-fuchsia-400 text-sm mb-4">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Band Journey Timeline */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-fuchsia-500/30 transform md:translate-x-px"></div>
            
            {/* Timeline events */}
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`mb-12 relative flex flex-col md:flex-row gap-8 items-center md:items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-fuchsia-500 transform -translate-x-1.5 md:-translate-x-2"></div>
                
                {/* Year */}
                <div className="md:w-1/2 text-center md:text-right md:pr-8">
                  <span className="inline-block bg-fuchsia-500 text-white font-bold px-4 py-1 rounded-full">
                    {milestone.year}
                  </span>
                </div>
                
                {/* Event */}
                <div className="md:w-1/2 md:pl-8">
                  <div className="bg-gray-800/30 p-4 rounded-lg border border-fuchsia-500/10">
                    {milestone.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;