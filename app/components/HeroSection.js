"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-[#fff5f0] to-[#fefcf8] overflow-hidden px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-leaves opacity-50" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 animate-bounce" style={{ animationDuration: "3s" }} />
      <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-accent/20 animate-bounce" style={{ animationDuration: "4s", animationDelay: "0.5s" }} />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full bg-secondary/10 animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "1s" }} />

      <div className="container-custom relative z-10 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full mb-6">
              #1 Cold-Pressed Juice Brand
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Pressed for
              <span className="text-primary"> Perfection</span>,
              <br />
              Packed for
              <span className="text-secondary"> Life</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
              Experience the purest cold-pressed juices crafted from organic,
              locally-sourced ingredients. No fillers, no preservatives—just
              nature&apos;s best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/products"
                className="btn-primary inline-flex items-center justify-center gap-2 text-lg"
              >
                Shop Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#how-it-works"
                className="btn-secondary inline-flex items-center justify-center gap-2 text-lg"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 justify-center md:justify-start mt-10">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100% Organic
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Cold Pressed
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No Added Sugar
              </div>
            </div>
          </div>

          {/* Right Content - Juice Display */}
          <div className="relative hidden md:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main Juice Bottle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-white rounded-3xl shadow-2xl flex items-center justify-center animate-pulse-glow">
                <div className="text-center">
                  <div className="text-8xl mb-4">🥬</div>
                  <div className="text-xl font-bold text-gray-800">Green Machine</div>
                  <div className="text-primary font-semibold">$12.99</div>
                </div>
              </div>

              {/* Floating Small Bottles */}
              <div className="absolute top-10 right-10 w-24 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-bounce">
                <div className="text-center">
                  <div className="text-4xl">🍊</div>
                  <div className="text-xs font-semibold">$10.99</div>
                </div>
              </div>

              <div className="absolute bottom-10 left-10 w-24 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-bounce" style={{ animationDelay: "0.5s" }}>
                <div className="text-center">
                  <div className="text-4xl">🫐</div>
                  <div className="text-xs font-semibold">$11.99</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}