"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-[#fff5f0] via-[#fff8f5] to-[#fefcf8] overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM1NTUiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRjLS4xNyAwLS4zNy0uMzUtLjM3LS43N1YzMmgtMnYtMnptLTJ0LTRjLS4zNy4zNy0uMzcuNzUtLjM3IDEuNDV2MTRoMnYtMnptMjQtNGgydjJjLjMxIDAgLjYzLjI3LjczLjY3djJoMnYtMnptLTJ0LTRjLjM3LjM3LjM3Ljc1LjMxIDEuNDV2MTJoMnYtMnptLTI0LTRjLjMxIDAgLjYzLjI3LjczLjY3djJoMnYtMnptMjQtNGgydjJjLS4zNy0uMzctLjM3LS43NS0uMzctMS40OHYtMTJoMnYtMnptLTJ0LTRjLS4zNy0uMzctLjM3LS43NS0uMzctMS40OHYtMTJoMnYtMnptMjQtNGgydjJjLS4zNy0uMzctLjM3LS43NS0uMzctMS40OHYtMTJoMnYtMnptLTIwLTRjLS4zNy0uMzctLjM3LS43NS0uMzctMS40OHYtMTJoMnYtMnptMTYtNGMuMzcuMzcuMzcuNzUuMzEgMS40OHYxMmgtMnYtMnptLTEyLTRjLjMxIDAgLjYzLjI3LjczLjY3djJoMnYtMnptMGgtMmMuMzcuMzcuMzcuNzUuMzEgMS40OHYxMmgtMnYtMnptOC00Yy4zNy4zNy4zNy43NS4zMSAxLjQ5djEyaC0ydi0yem0tNC0yYy4zNy4zNy4zNy43NS4zMSAxLjQ5djEyaC0ydi0yek0yMC0yaC0ydi0yem0tNC0yYy0uMzctLjM3LS4zNy0uNzUtLjM3LTEuNDl2LTEyaC0ydi0yem0tOC0yYy0uMzctLjM3LS4zNy0uNzUtLjM3LTEuNDl2LTEyaC0ydi0yem0tMTItMmMtLjM3LS4zNy0uMzctLjc1LS4MzctMS40OHYtMTJoLTIudi0yek0yMCAyMHYtMnptLTQtMmMtLjM3LS4zNy0uMzctLjc1LS4MzctMS40OHYtMTJoLTIudi0yek0yOCA1NnYtMnptLTQtMmMtLjM3LS4zNy0uMzctLjc1LS4MzctMS40OHYtMTJoLTIudi0yek04IDU2di0yek0yMCAyMXYtMnptMTYgMjB2LTJ6bTQtMnYyem0tOC0ydjJ6bTEyIDJ2MnptMi0ydjJ6bTE2IDJ2MnptMjQtMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      {/* Floating Organic Elements */}
      <div className="absolute top-32 left-[10%] w-24 h-24 rounded-full bg-gradient-to-br from-green-400/20 to-green-500/10 blur-xl animate-pulse" />
      <div className="absolute top-48 right-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-orange-400/20 to-orange-500/10 blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-32 left-[20%] w-20 h-20 rounded-full bg-gradient-to-br from-green-500/15 to-green-600/10 blur-xl animate-pulse" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-20 right-[25%] w-28 h-28 rounded-full bg-gradient-to-br from-orange-500/15 to-orange-600/10 blur-xl animate-pulse" style={{ animationDelay: "1.5s" }} />

      {/* Decorative Dots */}
      <div className="absolute top-1/4 left-[5%] w-2 h-2 rounded-full bg-primary/40" />
      <div className="absolute top-1/3 left-[8%] w-3 h-3 rounded-full bg-secondary/30" />
      <div className="absolute top-2/3 right-[8%] w-2 h-2 rounded-full bg-primary/40" />
      <div className="absolute bottom-1/3 right-[12%] w-3 h-3 rounded-full bg-secondary/30" />

      <div className="container-custom relative z-10 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Badge */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-primary font-semibold rounded-full mb-6 shadow-lg">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                #1 Cold-Pressed
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">Free shipping $50+</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary to-green-600 bg-clip-text text-transparent">
                Fresh Pressed
              </span>
              <br />
              for{' '}
              <span className="text-secondary">Peak Performance</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
              Unlock your daily vitality with{' '}
              <span className="text-primary font-semibold">cold-pressed juices</span>{' '}
              crafted from organic, farm-fresh ingredients. 100% natural, no additives—{' '}
              <span className="text-green-600 font-medium">just pure energy</span> in every bottle.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="/products"
                className="group relative px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 inline-flex items-center justify-center gap-2 text-lg"
              >
                <span>Shop Now</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="#how-it-works"
                className="px-8 py-4 bg-white text-primary font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2 text-lg border-2 border-primary/10"
              >
                How It Works
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200/60">
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-primary">50K+</div>
                <div className="text-xs md:text-sm text-gray-500">Happy Customers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-secondary">4.9</div>
                <div className="text-xs md:text-sm text-gray-500">Star Rating</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-green-600">100%</div>
                <div className="text-xs md:text-sm text-gray-500">Organic</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8 pt-4">
              {[
                { icon: '🌿', text: 'Organic Certified' },
                { icon: '❄️', text: 'Cold Pressed' },
                { icon: '🚫', text: 'No Added Sugar' },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 bg-white/60 rounded-full text-sm text-gray-600 shadow-sm"
                >
                  <span>{badge.icon}</span>
                  <span className="font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Juice Display */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main Glow Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-green-400/30 to-primary/20 rounded-full blur-3xl" />

              {/* Main Juice Bottle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-72 bg-white rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden animate-pulse-glow">
                <div className="relative w-full h-full">
                  <Image
                    src="/green-vitality.jpg"
                    alt="Green Vitality Juice"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white">
                    <div className="text-sm font-medium mb-1">Best Seller</div>
                    <div className="text-xl font-bold">Green Vitality</div>
                    <div className="text-green-400 font-bold">$12.99</div>
                  </div>
                </div>
              </div>

              {/* Floating Small Bottles */}
              <div className="absolute top-8 right-8 w-20 h-28 bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden animate-bounce">
                <div className="relative w-full h-full">
                  <Image
                    src="/citrus-sunrise.jpg"
                    alt="Citrus Sunrise"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-1 left-0 right-0 text-center">
                    <div className="text-xs font-bold text-white">$10.99</div>
                  </div>
                </div>
              </div>

              <div
                className="absolute bottom-12 left-8 w-20 h-28 bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden animate-bounce"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/tropical-paradise.jpg"
                    alt="Tropical Paradise"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-1 left-0 right-0 text-center">
                    <div className="text-xs font-bold text-white">$11.99</div>
                  </div>
                </div>
              </div>

              {/* Decorative Ring */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-dashed border-primary/20 rounded-full animate-spin-slow" />
            </div>
          </div>
        </div>

        {/* Secure Payment Badge */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="flex items-center gap-6 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-gray-600 font-medium">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-1">
              {[
                { name: "Visa", color: "#1A1F71" },
                { name: "MC", color: "#FF5F00" },
                { name: "Amex", color: "#006FCF" },
                { name: "PayPal", color: "#003087" },
              ].map((card, i) => (
                <span
                  key={card.name}
                  className="w-8 h-5 rounded flex items-center justify-center text-[10px] font-bold"
                  style={{ backgroundColor: card.color, color: "#fff" }}
                >
                  {card.name}
                </span>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-sm text-gray-400">Scroll to explore</span>
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}