'use client';

import { useState, useEffect } from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Fitness Coach',
      image: '👩‍💼',
      content: 'Fresh Press juices have transformed my morning routine. The Green Machine gives me energy that lasts all day!',
      rating: 5,
    },
    {
      name: 'James L.',
      role: 'Busy Professional',
      image: '👨‍💼',
      content: 'As someone who forgets to eat veggies, these juices are a lifesaver. Tastes amazing and I feel great!',
      rating: 5,
    },
    {
      name: 'Emily R.',
      role: 'Wellness Blogger',
      image: '👩‍🎨',
      content: 'Finally, a juice brand that delivers on its promises. The quality is unmatched and the taste is incredible.',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <section className="section bg-gradient-to-b from-white to-[#fff5f0]">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by <span className="text-secondary">Thousands</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it—hear what our community has to say.
          </p>
        </div>

        {/* Single Review Slider */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm relative">
            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mb-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="text-center">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 9.16c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-8 text-lg italic">&ldquo;{current.content}&rdquo;</p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl">
                  {current.image}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{current.name}</div>
                  <div className="text-sm text-gray-500">{current.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}