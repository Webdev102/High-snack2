import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingCart, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { menuItems } from '../data/mock';

const Order = () => {
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    deliveryType: 'delivery' // 'delivery' or 'pickup'
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Group items by id and count quantities
    const groupedCart = savedCart.reduce((acc, item) => {
      const existing = acc.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        acc.push({ ...item, quantity: 1 });
      }
      return acc;
    }, []);
    
    setCart(groupedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    // Flatten cart back to localStorage format
    const flatCart = newCart.flatMap(item => 
      Array(item.quantity).fill().map(() => ({ ...item, quantity: undefined }))
    );
    localStorage.setItem('cart', JSON.stringify(flatCart));
  };

  const updateQuantity = (itemId, change) => {
    const newCart = cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    updateCart(newCart);
  };

  const removeItem = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId);
    updateCart(newCart);
  };

  const addMoreItems = (itemId) => {
    const item = menuItems.find(m => m.id === itemId);
    if (item) {
      const existingItem = cart.find(i => i.id === itemId);
      if (existingItem) {
        updateQuantity(itemId, 1);
      } else {
        updateCart([...cart, { ...item, quantity: 1 }]);
      }
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = orderDetails.deliveryType === 'delivery' ? 2.50 : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast({
        title: "Winkelwagen is leeg",
        description: "Voeg eerst items toe aan je winkelwagen.",
        variant: "destructive"
      });
      return;
    }

    // Mock order submission - will be replaced with backend
    const order = {
      ...orderDetails,
      items: cart,
      subtotal,
      deliveryFee,
      total,
      date: new Date().toISOString()
    };

    console.log('Order submitted:', order);

    toast({
      title: "Bestelling geplaatst!",
      description: "Je ontvangt een bevestiging per email.",
    });

    // Clear cart
    setCart([]);
    localStorage.removeItem('cart');
    setOrderDetails({
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
      deliveryType: 'delivery'
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Online </span>
            <span className="text-[#FFD700]">Bestellen</span>
          </h1>
          <p className="text-gray-400 text-lg">Snel en gemakkelijk je favoriete snacks</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Delivery Type */}
              <div className="bg-[#1a1a1a] border border-[#FFD700]/30 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Bezorgwijze</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setOrderDetails({ ...orderDetails, deliveryType: 'delivery' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      orderDetails.deliveryType === 'delivery'
                        ? 'border-[#FFD700] bg-[#FFD700]/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">🚚</div>
                      <div className="font-semibold text-white">Bezorgen</div>
                      <div className="text-sm text-gray-400">€2.50</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderDetails({ ...orderDetails, deliveryType: 'pickup' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      orderDetails.deliveryType === 'pickup'
                        ? 'border-[#FFD700] bg-[#FFD700]/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">🏪</div>
                      <div className="font-semibold text-white">Afhalen</div>
                      <div className="text-sm text-gray-400">Gratis</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-[#1a1a1a] border border-[#FFD700]/30 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Jouw Gegevens</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Naam *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={orderDetails.name}
                      onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                      required
                      className="bg-[#0a0a0a] border-[#FFD700]/30 text-white mt-2"
                      placeholder="Jouw naam"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderDetails.email}
                      onChange={(e) => setOrderDetails({ ...orderDetails, email: e.target.value })}
                      required
                      className="bg-[#0a0a0a] border-[#FFD700]/30 text-white mt-2"
                      placeholder="jouw@email.nl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Telefoon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={orderDetails.phone}
                      onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                      required
                      className="bg-[#0a0a0a] border-[#FFD700]/30 text-white mt-2"
                      placeholder="06 12345678"
                    />
                  </div>
                  {orderDetails.deliveryType === 'delivery' && (
                    <div>
                      <Label htmlFor="address" className="text-white">Bezorgadres *</Label>
                      <Textarea
                        id="address"
                        value={orderDetails.address}
                        onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
                        required
                        rows={3}
                        className="bg-[#0a0a0a] border-[#FFD700]/30 text-white mt-2 resize-none"
                        placeholder="Straat, huisnummer, postcode, stad"
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="notes" className="text-white">Opmerkingen (optioneel)</Label>
                    <Textarea
                      id="notes"
                      value={orderDetails.notes}
                      onChange={(e) => setOrderDetails({ ...orderDetails, notes: e.target.value })}
                      rows={3}
                      className="bg-[#0a0a0a] border-[#FFD700]/30 text-white mt-2 resize-none"
                      placeholder="Bijv. extra saus, allergieën, etc."
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#FFD700] text-black hover:bg-[#B8860B] font-bold text-lg"
              >
                <CreditCard className="mr-2" />
                Plaats Bestelling - €{total.toFixed(2)}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1a1a] border border-[#FFD700]/30 rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <ShoppingCart className="mr-2" />
                Winkelwagen
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Je winkelwagen is leeg</p>
                  <Button
                    asChild
                    className="mt-4 bg-[#FFD700] text-black hover:bg-[#B8860B] font-semibold"
                  >
                    <a href="/menu">Bekijk Menu</a>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-700">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">{item.name}</h3>
                          <p className="text-[#FFD700] font-bold mb-2">€{item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center transition-colors"
                            >
                              <Minus size={14} className="text-white" />
                            </button>
                            <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center transition-colors"
                            >
                              <Plus size={14} className="text-white" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="ml-auto text-red-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotaal</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Bezorgkosten</span>
                      <span>€{deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-[#FFD700] pt-3 border-t border-gray-700">
                      <span>Totaal</span>
                      <span>€{total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
