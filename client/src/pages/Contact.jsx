import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Visual Header */}
       <div className="bg-indigo-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-20 transform translate-x-1/3 translate-y-1/3"></div>
          </div>
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-6">
               Let's Connect
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-indigo-100">
               We’d love to hear from you. Whether you have a question about our products, pricing, or just want to say hello, our team is ready to answer all your questions.
            </p>
          </div>
       </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Contact Info Card */}
           <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col justify-between h-full relative z-10">
              <div>
                 <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
                 <p className="text-gray-500 mb-10">Fill out the form and our team will get back to you within 24 hours.</p>
                 
                 <div className="space-y-8">
                    <div className="flex items-start group">
                       <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                             <MapPin size={24} />
                          </div>
                       </div>
                       <div className="ml-6">
                          <p className="text-xl font-bold text-gray-900">Our Location</p>
                          <p className="mt-1 text-gray-500 text-lg">Bet Shemesh, Israel</p>
                       </div>
                    </div>
                    
                    <div className="flex items-start group">
                       <div className="flex-shrink-0">
                           <div className="flex items-center justify-center h-14 w-14 rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                             <Phone size={24} />
                          </div>
                       </div>
                       <div className="ml-6">
                          <p className="text-xl font-bold text-gray-900">Phone</p>
                          <p className="mt-1 text-gray-500 text-lg">053-551-4764</p>
                          <p className="text-sm text-indigo-500 mt-1 font-medium">Mon-Fri 9am to 6pm</p>
                       </div>
                    </div>

                    <div className="flex items-start group">
                       <div className="flex-shrink-0">
                           <div className="flex items-center justify-center h-14 w-14 rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                             <Mail size={24} />
                          </div>
                       </div>
                       <div className="ml-6">
                          <p className="text-xl font-bold text-gray-900">Email</p>
                          <p className="mt-1 text-gray-500 text-lg">mebratumengstu21@gmail.com</p>
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="mt-12 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                 <div className="flex items-center mb-2">
                    <MessageCircle className="text-indigo-500 mr-2" size={20} />
                    <h4 className="font-bold text-gray-900">Live Chat Support</h4>
                 </div>
                 <p className="text-gray-600 text-sm">Need immediate assistance? Our support team is available via live chat during business hours.</p>
              </div>
           </div>

           {/* Contact Form Card */}
           <div className="bg-white rounded-2xl shadow-xl p-10 relative z-10">
              {submitted ? (
                 <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6 animate-bounce">
                       <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h3>
                    <p className="text-gray-500 text-lg max-w-xs mx-auto">We've received your message and will get back to you within 24 hours.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-10 px-8 py-3 bg-indigo-50 text-indigo-600 rounded-full font-bold hover:bg-indigo-100 transition">Send another</button>
                 </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input 
                           type="text" 
                           id="name" 
                           required
                           className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                           placeholder="John Doe"
                           value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                     </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input 
                           type="email" 
                           id="email" 
                           required
                           className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                           placeholder="john@example.com"
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                     </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <select 
                      id="subject" 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                       <option value="">Select a topic...</option>
                       <option value="order">Order Status</option>
                       <option value="return">Returns & Refunds</option>
                       <option value="product">Product Inquiry</option>
                       <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows="5" 
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none resize-none"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <Send size={20} className="mr-2" />
                    Send Message
                  </button>
                </form>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
