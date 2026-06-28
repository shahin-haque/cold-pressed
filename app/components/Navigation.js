'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CartIcon } from './CartIcon';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop Juices' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className='fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/50'>
        <div className='max-w-7xl mx-auto px-4 md:px-8'>
          <div className='flex items-center justify-between h-16 md:h-20'>
            {/* Logo */}
            <Link href='/' className='flex items-center gap-2'>
              <div className='w-10 h-10 rounded-full bg-primary border-2 border-secondary flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>F</span>
                <span className='text-white font-bold text-lg'>P</span>
              </div>
              <span className='font-bold text-xl tracking-tight'>
                Fresh<span className='text-primary'>Press</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-8'>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='font-medium text-gray-700 hover:text-primary transition-colors'
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Cart & Mobile Menu */}
            <div className='flex items-center gap-4'>
              <CartIcon />

              {/* Mobile menu button */}
              <button
                className='md:hidden p-2 hover:bg-muted cursor-pointer rounded-full'
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className='fixed inset-0 bg-black/50 z-40 md:hidden'
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div className='fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden'>
            <div className='flex flex-col h-full'>
              {/* Header */}
              <div className='flex items-center justify-between p-6 border-b'>
                <span className='text-xl font-bold'>Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className='p-2 hover:bg-muted rounded-full'
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
              {/* Links */}
              <div className='flex-1 overflow-y-auto p-6'>
                <div className='space-y-4'>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className='block py-3 px-4 text-lg font-medium text-gray-700 hover:bg-muted rounded-xl'
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}