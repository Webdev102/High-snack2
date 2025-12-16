import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from 'lucide-react';
import { restaurantInfo } from '../data/mock';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-[#FFD700]/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-[#FFD700]">HIGH</span>
              <span className="text-white"> SNACK</span>
            </h3>
            <p className="text-gray-400 mb-4">
              De beste late-night snacks van Amsterdam. Vers, snel en betaalbaar.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFD700] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FFD700] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[#FFD700] mb-4">Snelle Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Bestel Online
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-[#FFD700] mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin size={20} className="text-[#FFD700] flex-shrink-0 mt-1" />
                <span>
                  {restaurantInfo.address}<br />
                  {restaurantInfo.postalCode} {restaurantInfo.city}
                </span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={20} className="text-[#FFD700] flex-shrink-0" />
                <a href={`tel:${restaurantInfo.phone}`} className="hover:text-[#FFD700] transition-colors">
                  {restaurantInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={20} className="text-[#FFD700] flex-shrink-0" />
                <a href={`mailto:${restaurantInfo.email}`} className="hover:text-[#FFD700] transition-colors">
                  {restaurantInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold text-[#FFD700] mb-4">
              <Clock size={20} className="inline mr-2" />
              Openingstijden
            </h4>
            <ul className="space-y-2">
              {restaurantInfo.openingHours.map((schedule, index) => (
                <li key={index} className="text-gray-400">
                  <div className="font-medium text-white">{schedule.day}</div>
                  <div>{schedule.hours}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Snackbar High Snack. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;