"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

const FREE_SHIPPING_THRESHOLD = 50;
const STANDARD_SHIPPING_COST = 5.99;

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
    setIsCartOpen,
  } = useCart();

  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const amountUntilFree = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  if (cartItems.length === 0) {
    return (
      <main className='pt-16 md:pt-20 min-h-screen bg-gray-50'>
        <div className='container-custom py-20 text-center'>
          <svg
            className='w-24 h-24 mx-auto text-gray-300 mb-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
          <h1 className='text-3xl font-bold mb-4'>Your Cart is Empty</h1>
          <p className='text-gray-600 mb-8'>
            Looks like you haven't added any juices yet.
          </p>
          <Link
            href='/products'
            className='btn-primary inline-flex items-center gap-2'
          >
            Shop Now
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
      </main>
    );
  }

  return (
    <main className='pt-16 md:pt-20 min-h-screen bg-gray-50'>
      <div className='container-custom py-12'>
        <h1 className='text-3xl md:text-4xl font-bold mb-8'>
          Shopping Cart ({cartCount})
        </h1>

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-2 space-y-4'>
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${item.size}`}
                className='flex gap-4 bg-white p-4 rounded-2xl shadow-sm'
              >
                <div className='w-24 h-24 relative bg-gray-100 rounded-xl overflow-hidden flex-shrink-0'>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className='object-cover'
                      sizes='96px'
                    />
                  )}
                </div>
                <div className='flex-1'>
                  <div className='flex justify-between'>
                    <div>
                      <h3 className='font-bold text-lg'>{item.name}</h3>
                      <p className='text-gray-500'>{item.size}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className='p-2 text-gray-400 hover:text-red-500'
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
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                    </button>
                  </div>
                  <div className='flex items-center justify-between mt-4'>
                    <div className='flex items-center gap-3'>
                      <button
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className='w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center'
                      >
                        -
                      </button>
                      <span className='font-medium w-8 text-center'>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className='w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center'
                      >
                        +
                      </button>
                    </div>
                    <span className='font-bold text-lg'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white p-6 rounded-2xl shadow-sm sticky top-24'>
              <h2 className='text-xl font-bold mb-6'>Order Summary</h2>
              <div className='space-y-4 border-b border-gray-100 pb-6'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='font-semibold'>${cartTotal.toFixed(2)}</span>
                </div>
                {amountUntilFree > 0 && (
                  <div className='bg-green-50 p-3 rounded-lg'>
                    <p className='text-sm text-green-700 mb-2'>
                      Add ${amountUntilFree.toFixed(2)} more for FREE shipping!
                    </p>
                    <div className='w-full bg-green-200 rounded-full h-2'>
                      <div
                        className='bg-green-500 h-2 rounded-full transition-all'
                        style={{ width: `${(cartTotal / FREE_SHIPPING_THRESHOLD) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Shipping</span>
                  <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : ''}`}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
              </div>
              <div className='flex justify-between py-6 text-lg font-bold'>
                <span>Total</span>
                <span>${(cartTotal + shippingCost).toFixed(2)}</span>
              </div>
              <Link href='/checkout' className='w-full btn-primary py-4 text-lg mb-4 text-center block'>
                Proceed to Checkout
              </Link>
              <Link
                href='/products'
                className='block text-center text-primary hover:underline'
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
