import React, { useState } from 'react';
import { menuItems, categories } from '../data/mock';
import { Button } from '../components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [cart, setCart] = useState([]);

  const filteredItems = selectedCategory === 'Alle'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item) => {
    setCart([...cart, item]);
    // Save to localStorage for order page
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    localStorage.setItem('cart', JSON.stringify([...currentCart, item]));
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Ons </span>
            <span className="text-[#FFD700]">Menu</span>
          </h1>
          <p className="text-gray-400 text-lg">Vers bereid, altijd lekker</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-[#FFD700] text-black'
                  : 'bg-[#1a1a1a] text-white border border-[#FFD700]/30 hover:border-[#FFD700]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cart Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-8 right-8 z-40">
            <Button
              asChild
              size="lg"
              className="bg-[#FFD700] text-black hover:bg-[#B8860B] font-bold shadow-2xl"
            >
              <Link to="/order">
                <ShoppingCart className="mr-2" />
                Winkelwagen ({cart.length})
              </Link>
            </Button>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="card-hover bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#FFD700]/20 fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#FFD700] text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-gray-400 mb-4 text-sm">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#FFD700]">€{item.price.toFixed(2)}</span>
                  <Button
                    onClick={() => addToCart(item)}
                    size="sm"
                    className="bg-[#FFD700] text-black hover:bg-[#B8860B] font-semibold"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Toevoegen
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">Geen items gevonden in deze categorie.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;