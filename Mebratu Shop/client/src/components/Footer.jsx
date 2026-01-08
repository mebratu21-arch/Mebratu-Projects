import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Mebratu Shop</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We make online shopping simple, affordable, and trustworthy. Shop with confidence every time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition">Products</Link></li>
              <li><Link to="/deals" className="text-gray-400 hover:text-white transition">Today's Deals</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Help Center</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Returns & Refunds</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Shipping Info</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-indigo-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">Bet Shemesh, Israel</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-indigo-400 flex-shrink-0" />
                <span className="text-gray-400">053-551-4764</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-indigo-400 flex-shrink-0" />
                <span className="text-gray-400">mebratumengstu21@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Mebratu Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
