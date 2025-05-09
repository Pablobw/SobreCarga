import React, { useState } from 'react';
import { Send, Mail, MapPin, Calendar, Mic, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        success: true,
        message: 'Thank you for your message! We\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }, 1000);
  };
  
  const contactOptions = [
    {
      icon: <Mail className="text-fuchsia-500 h-6 w-6" />,
      title: 'Email Us',
      description: 'For general inquiries and fan mail',
      info: 'info@sobrecarga.com'
    },
    {
      icon: <Mic className="text-fuchsia-500 h-6 w-6" />,
      title: 'Booking',
      description: 'For performance and appearance requests',
      info: 'booking@sobrecarga.com'
    },
    {
      icon: <Calendar className="text-fuchsia-500 h-6 w-6" />,
      title: 'Press',
      description: 'For media inquiries and interviews',
      info: 'press@sobrecarga.com'
    }
  ];

  return (
    <div className="pt-16">
      {/* Contact Header */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Get in Touch</h1>
          <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Have questions, want to book us for an event, or just want to say hello? 
            We'd love to hear from you!
          </p>
        </div>
      </section>
      
      {/* Contact Info Cards */}
      <section className="py-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
              <div key={index} className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 hover:border-fuchsia-500/50 transition-all duration-300 shadow-lg">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gray-800 p-3 rounded-full mb-4">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{option.description}</p>
                  <p className="text-fuchsia-400 font-medium">{option.info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Form & Map */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {formStatus && (
                <div className={`p-4 rounded-lg mb-6 ${
                  formStatus.success ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <p>{formStatus.message}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Booking Request">Booking Request</option>
                    <option value="Press/Media">Press/Media</option>
                    <option value="Fan Mail">Fan Mail</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Location & Upcoming Shows */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Find Us</h2>
              
              <div className="bg-gray-800/30 rounded-lg overflow-hidden mb-8">
                <div className="h-64 bg-gray-800 flex items-center justify-center">
                  <div className="text-center p-4">
                    <MapPin className="h-12 w-12 text-fuchsia-500 mx-auto mb-4" />
                    <p className="text-lg font-medium">Based in Ciudad de México, México</p>
                    <p className="text-gray-400">Touring throughout Latin America</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-fuchsia-500" />
                  Upcoming Shows
                </h3>
                
                <div className="space-y-4">
                  {[
                    { date: 'JUL 28, 2025', venue: 'Rock Revolution Festival', location: 'Ciudad de México' },
                    { date: 'AUG 15, 2025', venue: 'Club Sonido', location: 'Guadalajara' },
                    { date: 'SEP 03, 2025', venue: 'Teatro Metropólitan', location: 'Ciudad de México' },
                    { date: 'OCT 12, 2025', venue: 'Latin Rock Fest', location: 'Buenos Aires, Argentina' }
                  ].map((show, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-800/40 p-4 rounded-lg border border-gray-700 hover:border-fuchsia-500/30 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-fuchsia-400 text-sm font-medium">{show.date}</div>
                          <h4 className="font-bold">{show.venue}</h4>
                          <p className="text-gray-400 text-sm">{show.location}</p>
                        </div>
                        <button className="bg-fuchsia-600/20 hover:bg-fuchsia-600 text-fuchsia-400 hover:text-white text-sm px-3 py-1 rounded-full transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Fan Club Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Fan Club</h2>
            <p className="text-gray-300 mb-8">
              Sign up to receive updates on new music releases, upcoming shows, and exclusive content.
              Be the first to know when we'll be performing in your city!
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium px-6 py-3 rounded-lg whitespace-nowrap transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;