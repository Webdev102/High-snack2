import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { menuItems, reviews } from '../data/mock';

const Home = () => {
  const featuredItems = menuItems.slice(0, 3);
  const topReviews = reviews.slice(0, 3);
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1632898658030-ead731d252d4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2Vyc3xlbnwwfHx8fDE3NjU5MjgzOTB8MA&ixlib=rb-4.1.0&q=85')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 fade-in">
            <span className="text-white">De Beste</span>
            <br />
            <span className="text-[#FFD700] gold-shimmer bg-clip-text text-transparent">Late-Night Snacks</span>
            <br />
            <span className="text-white">van Amsterdam</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            Vers, snel en betaalbaar. Open tot 02:00 uur!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in" style={{ animationDelay: '0.4s' }}>
            <Button
              asChild
              size="lg"
              className="bg-[#FFD700] text-black hover:bg-[#B8860B] font-bold text-lg px-8 py-6"
            >
              <Link to="/menu">
                Bekijk Menu
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-bold text-lg px-8 py-6"
            >
              <Link to="/order">Bestel Online</Link>
            </Button>
          </div>

          {/* Quick Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-black/60 backdrop-blur-md border border-[#FFD700]/30 rounded-lg p-6">
              <Star className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
              <div className="text-3xl font-bold text-[#FFD700] mb-1">{averageRating}</div>
              <div className="text-gray-300">Gemiddelde beoordeling</div>
            </div>
            <div className="bg-black/60 backdrop-blur-md border border-[#FFD700]/30 rounded-lg p-6">
              <Clock className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
              <div className="text-3xl font-bold text-[#FFD700] mb-1">02:00</div>
              <div className="text-gray-300">Open tot laat</div>
            </div>
            <div className="bg-black/60 backdrop-blur-md border border-[#FFD700]/30 rounded-lg p-6">
              <MapPin className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
              <div className="text-lg font-bold text-[#FFD700] mb-1">Centrum</div>
              <div className="text-gray-300">Hart van Amsterdam</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#FFD700]">Populaire</span>
              <span className="text-white"> Gerechten</span>
            </h2>
            <p className="text-gray-400 text-lg">Onze meest geliefde items</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <div
                key={item.id}
                className="card-hover bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#FFD700]/20 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden image-overlay">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-[#FFD700] font-semibold mb-2">{item.category}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#FFD700]">€{item.price.toFixed(2)}</span>
                    <Button
                      size="sm"
                      className="bg-[#FFD700] text-black hover:bg-[#B8860B] font-semibold"
                    >
                      Bestel
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-[#FFD700] text-black hover:bg-[#B8860B] font-bold"
            >
              <Link to="/menu">
                Volledig Menu
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Wat Onze </span>
              <span className="text-[#FFD700]">Klanten</span>
              <span className="text-white"> Zeggen</span>
            </h2>
            <div className="flex items-center justify-center gap-2 text-2xl">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(averageRating) ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-600'
                  }`}
                />
              ))}
              <span className="text-[#FFD700] font-bold ml-2">{averageRating}</span>
              <span className="text-gray-400">/ 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topReviews.map((review, index) => (
              <div
                key={review.id}
                className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg p-6 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{review.comment}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#FFD700] font-semibold">{review.name}</span>
                  <span className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString('nl-NL')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-semibold"
            >
              <Link to="/reviews">Alle Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-black to-[#0a0a0a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Honger? </span>
            <span className="text-[#FFD700]">Bestel Nu!</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Snel en gemakkelijk online bestellen. We zijn er voor je tot 02:00 uur!
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#FFD700] text-black hover:bg-[#B8860B] font-bold text-lg px-12 py-6"
          >
            <Link to="/order">
              Start Bestelling
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;