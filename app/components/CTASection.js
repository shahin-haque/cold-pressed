'use client';

import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="section bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Transform Your
          <span className="text-primary"> Health</span>?
        </h2>
        <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
          Join over 50,000 happy customers who start their day with Fresh Press.
          Your first order ships free!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
            Get Started Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/about" className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-gray-900 transition-all">
            Our Story
          </Link>
        </div>

        {/* Money-back guarantee */}
        <div className="mt-10 flex items-center justify-center gap-2 text-gray-500">
          <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>30-Day Money-Back Guarantee</span>
        </div>
      </div>
    </section>
  );
}