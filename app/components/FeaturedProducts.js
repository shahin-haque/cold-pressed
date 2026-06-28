"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { featuredProducts } from "../data/products";

function ProductAddToCart({ product }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      product,
      product.size?.[0] || { name: "500ml", price: product.price },
      1,
    );
  };

  return (
    <div className='flex items-center justify-between'>
      <span className='text-xl font-bold text-primary'>${product.price}</span>
      <button
        onClick={handleAdd}
        className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-white font-medium  cursor-pointer hover:bg-primary-dark transition-colors'
      >
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
        Add to Cart
      </button>
    </div>
  );
}

export default function FeaturedProducts() {
  const products = featuredProducts.map((p) => ({
    ...p,
    category: "featured",
    badge: p.badge || null,
    benefits: [],
    description: "",
  }));

  return (
    <section className='section bg-white'>
      <div className='container-custom'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Our Best-Selling <span className='text-secondary'>Juices</span>
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Crafted with love, pressed for perfection. Each bottle is made with
            premium organic ingredients delivered fresh to your door.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className='card group'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='aspect-square relative overflow-hidden bg-gray-100'>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-300'
                  sizes='(max-width: 768px) 100vw, 25vw'
                />
                {product.badge && (
                  <span className='absolute top-4 right-4 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full z-10'>
                    {product.badge}
                  </span>
                )}
              </div>
              <div className='p-5'>
                <h3 className='text-lg font-bold mb-1'>{product.name}</h3>
                <p className='text-sm text-gray-500 mb-3'>{product.tagline}</p>
                <ProductAddToCart product={product} />
              </div>
            </Link>
          ))}
        </div>

        <div className='text-center mt-10'>
          <Link
            href='/products'
            className='btn-secondary inline-flex items-center gap-2'
          >
            View All Products
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
