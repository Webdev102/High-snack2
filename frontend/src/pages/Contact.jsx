import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Send } from 'lucide-react';
import { restaurantInfo } from '../data/mock';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock submission - will be replaced with backend
    toast({
      title: "Bericht verzonden!",
      description: "We nemen zo snel mogelijk contact met je op.",
    });

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Neem </span>
            <span className="text-[#FFD700]">Contact Op</span>
          </h1>
          <p className="text-gray-400 text-lg">We horen graag van je!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Contact Informatie</h2>
              <p className="text-gray-400 text-lg mb-8">
                Heb je een vraag, opmerking of speciale wens? Neem gerust contact met ons op. 
                We staan altijd klaar om je te helpen!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-6 flex items-start space-x-4 card-hover">
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Telefoon</h3>
                  <a
                    href={`tel:${restaurantInfo.phone}`}
                    className="text-gray-300 hover:text-[#FFD700] transition-colors text-lg"
                  >
                    {restaurantInfo.phone}
                  </a>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-6 flex items-start space-x-4 card-hover">
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                  <a
                    href={`mailto:${restaurantInfo.email}`}
                    className="text-gray-300 hover:text-[#FFD700] transition-colors"
                  >
                    {restaurantInfo.email}
                  </a>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-6 flex items-start space-x-4 card-hover">
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Adres</h3>
                  <p className="text-gray-300">
                    {restaurantInfo.address}<br />
                    {restaurantInfo.postalCode} {restaurantInfo.city}
                  </p>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-6 flex items-start space-x-4 card-hover">
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Openingstijden</h3>
                  <div className="space-y-1">
                    {restaurantInfo.openingHours.map((schedule, index) => (
                      <div key={index} className="text-gray-300 text-sm">
                        <span className="font-medium">{schedule.day}:</span> {schedule.hours}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-[#FFD700]/10 to-transparent border border-[#FFD700]/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Volg Ons</h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center hover:bg-[#B8860B] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-black" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center hover:bg-[#B8860B] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6 text-black" />
                </a>
              </div>
              <p className="text-gray-400 text-sm mt-4">{restaurantInfo.socialMedia.instagram}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1a1a1a] border border-[#FFD700]/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Stuur een Bericht</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">Naam *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-[#0a0a0a] border-[#FFD700]/30 text-white"
                  placeholder="Jouw naam"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white mb-2 block">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-[#0a0a0a] border-[#FFD700]/30 text-white"
                  placeholder="jouw@email.nl"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-white mb-2 block">Onderwerp *</Label>
                <Input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="bg-[#0a0a0a] border-[#FFD700]/30 text-white"
                  placeholder="Waar gaat je bericht over?"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-white mb-2 block">Bericht *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-[#0a0a0a] border-[#FFD700]/30 text-white resize-none"
                  placeholder="Typ hier je bericht..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#FFD700] text-black hover:bg-[#B8860B] font-bold"
              >
                <Send className="w-4 h-4 mr-2" />
                Verstuur Bericht
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;