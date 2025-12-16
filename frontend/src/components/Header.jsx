import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Over Ons', path: '/about' },
    { name: 'Locatie', path: '/location' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#FFD700]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl md:text-3xl font-bold">
              <span className="text-[#FFD700]">HIGH</span>
              <span className="text-white"> SNACK</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-[#FFD700] text-black'
                    : 'text-white hover:text-[#FFD700] hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              asChild
              className="bg-[#FFD700] text-black hover:bg-[#B8860B] font-semibold"
            >
              <Link to="/order">
                <Phone className="w-4 h-4 mr-2" />
                Bestel Nu
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:text-[#FFD700] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 space-y-2 fade-in">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-[#FFD700] text-black'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              className="w-full bg-[#FFD700] text-black hover:bg-[#B8860B] font-semibold mt-4"
            >
              <Link to="/order" onClick={() => setIsMenuOpen(false)}>
                <Phone className="w-4 h-4 mr-2" />
                Bestel Nu
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;