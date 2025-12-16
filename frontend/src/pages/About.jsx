import React from 'react';
import { Clock, MapPin, Award, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Over </span>
            <span className="text-[#FFD700]">High Snack</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Jouw favoriete late-night spot in het hart van Amsterdam
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-[#FFD700]">Ons Verhaal</span>
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Snackbar High Snack is meer dan alleen een snackbar - het is een Amsterdamse instituut. 
                Gevestigd in het bruisende centrum van de stad, nabij de Oude Kerk, zijn we al jaren 
                dé plek voor de beste late-night snacks.
              </p>
              <p>
                Of je nu van een avondje uit komt, late shift hebt gewerkt, of gewoon trek hebt in 
                iets lekkers - wij staan voor je klaar tot 02:00 uur. Onze missie is simpel: verse, 
                smakelijke en betaalbare snacks serveren met een glimlach.
              </p>
              <p>
                Van klassieke patat tot onze signature burgers, elk gerecht wordt met zorg bereid. 
                We gebruiken alleen verse ingrediënten en houden onze prijzen eerlijk. Dat is wat ons 
                onderscheidt in het hart van Amsterdam.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.pexels.com/photos/12032528/pexels-photo-12032528.jpeg"
              alt="High Snack Interior"
              className="rounded-2xl shadow-2xl border-2 border-[#FFD700]/30 w-full h-auto"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-8 text-center card-hover">
            <div className="w-16 h-16 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-[#FFD700]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Open Laat</h3>
            <p className="text-gray-400">Tot 02:00 uur op weekdagen, 04:00 uur in het weekend</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-8 text-center card-hover">
            <div className="w-16 h-16 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-[#FFD700]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Centrale Locatie</h3>
            <p className="text-gray-400">Midden in het centrum, nabij de Oude Kerk</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-8 text-center card-hover">
            <div className="w-16 h-16 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-[#FFD700]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Kwaliteit</h3>
            <p className="text-gray-400">Verse ingrediënten, bereid met zorg</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-8 text-center card-hover">
            <div className="w-16 h-16 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-[#FFD700]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Voor Iedereen</h3>
            <p className="text-gray-400">Locals, toeristen, nachtbrakers - allen welkom</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#FFD700]/30 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-white">Waarom </span>
            <span className="text-[#FFD700]">High Snack?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#FFD700] mb-2">10+</div>
              <div className="text-xl text-white font-semibold mb-2">Jaren Ervaring</div>
              <p className="text-gray-400">Jarenlange expertise in het hart van Amsterdam</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#FFD700] mb-2">100%</div>
              <div className="text-xl text-white font-semibold mb-2">Vers Bereid</div>
              <p className="text-gray-400">Alles wordt op bestelling vers gemaakt</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#FFD700] mb-2">4.0★</div>
              <div className="text-xl text-white font-semibold mb-2">Klantbeoordeling</div>
              <p className="text-gray-400">Hoge waardering van onze klanten</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">Kom Langs of </span>
            <span className="text-[#FFD700]">Bestel Online</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            We kijken ernaar uit je te verwelkomen bij High Snack!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#FFD700] text-black hover:bg-[#B8860B] font-bold"
            >
              <Link to="/location">Vind Ons</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-bold"
            >
              <Link to="/order">Bestel Nu</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;