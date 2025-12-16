import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { reviews as mockReviews } from '../data/mock';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const Reviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const { toast } = useToast();

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: (reviews.filter(r => r.rating === star).length / reviews.length) * 100
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newReview = {
      id: reviews.length + 1,
      ...formData,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    
    // Reset form
    setFormData({ name: '', rating: 5, comment: '' });
    setShowForm(false);

    toast({
      title: "Review geplaatst!",
      description: "Bedankt voor je feedback.",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Klant </span>
            <span className="text-[#FFD700]">Reviews</span>
          </h1>
          <p className="text-gray-400 text-lg">Wat onze klanten over ons zeggen</p>
        </div>

        {/* Overall Rating */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#FFD700]/30 rounded-2xl p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Average Score */}
            <div className="text-center md:text-left">
              <div className="text-6xl md:text-7xl font-bold text-[#FFD700] mb-2">{averageRating}</div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 ${
                      i < Math.floor(averageRating) ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-400 text-lg">Gebaseerd op {reviews.length} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-white w-8">{star}★</span>
                  <div className="flex-1 h-3 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFD700] transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-400 w-12 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Write Review Button */}
        <div className="text-center mb-12">
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="bg-[#FFD700] text-black hover:bg-[#B8860B] font-bold"
            >
              Schrijf een Review
            </Button>
          )}
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="bg-[#1a1a1a] border border-[#FFD700]/30 rounded-xl p-8 mb-12 fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">Jouw Review</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">Naam</Label>
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
                <Label className="text-white mb-2 block">Beoordeling</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= formData.rating
                            ? 'fill-[#FFD700] text-[#FFD700]'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="comment" className="text-white mb-2 block">Jouw Ervaring</Label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  required
                  rows={4}
                  className="bg-[#0a0a0a] border-[#FFD700]/30 text-white resize-none"
                  placeholder="Vertel ons over je ervaring bij High Snack..."
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-[#FFD700] text-black hover:bg-[#B8860B] font-bold"
                >
                  Plaats Review
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="border-gray-600 text-gray-400 hover:bg-gray-800"
                >
                  Annuleren
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-6 md:p-8 fade-in card-hover"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{review.name}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < review.rating ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-gray-500 text-sm mt-2 md:mt-0">
                  {new Date(review.date).toLocaleDateString('nl-NL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;