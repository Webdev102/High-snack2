import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { restaurantInfo } from '../data/mock';
import { Button } from '../components/ui/button';

const Location = () => {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${restaurantInfo.coordinates.lat},${restaurantInfo.coordinates.lng}&zoom=15`;

  const getDirectionsUrl = `https://www.google.com/maps/dir//${restaurantInfo.coordinates.lat},${restaurantInfo.coordinates.lng}`;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Onze </span>
            <span className="text-[#FFD700]">Locatie</span>
          </h1>
          <p className="text-gray-400 text-lg">Makkelijk te vinden in het hart van Amsterdam</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <div className="order-2 lg:order-1">
            <div className="bg-[#1a1a1a] border border-[#FFD700]/30 rounded-2xl overflow-hidden h-[500px]">
              {/* Placeholder for Google Maps */}
              <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center relative">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-[#FFD700] mx-auto mb-4" />
                  <p className="text-white text-lg font-semibold mb-2">Google Maps Integratie</p>
                  <p className="text-gray-400 mb-4">Interactieve kaart wordt geladen met Google Maps API</p>
                  <Button
                    asChild
                    className="bg-[#FFD700] text-black hover:bg-[#B8860B] font-semibold"
                  >
                    <a
                      href={getDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-[#FFD700] rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Address */}
            <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Adres</h3>
                  <p className="text-gray-300 text-lg">
                    {restaurantInfo.address}<br />
                    {restaurantInfo.postalCode} {restaurantInfo.city}
                  </p>
                  <Button
                    asChild
                    variant="link"
                    className="text-[#FFD700] hover:text-[#B8860B] p-0 mt-2"
                  >
                    <a
                      href={getDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Routebeschrijving
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-4">Openingstijden</h3>
                  <div className="space-y-3">
                    {restaurantInfo.openingHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{schedule.day}</span>
                        <span className="text-[#FFD700] font-semibold">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Contact</h3>
                  <div className="space-y-2">
                    <a
                      href={`tel:${restaurantInfo.phone}`}
                      className="text-gray-300 hover:text-[#FFD700] text-lg block transition-colors"
                    >
                      {restaurantInfo.phone}
                    </a>
                    <a
                      href={`mailto:${restaurantInfo.email}`}
                      className="text-gray-300 hover:text-[#FFD700] block transition-colors"
                    >
                      {restaurantInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Directions Note */}
            <div className="bg-gradient-to-br from-[#FFD700]/10 to-transparent border border-[#FFD700]/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-[#FFD700] mb-2">Makkelijk te Vinden!</h4>
              <p className="text-gray-300">
                We bevinden ons in het centrum van Amsterdam, op loopafstand van de Oude Kerk 
                en het Centraal Station. Perfect bereikbaar met openbaar vervoer of te voet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;