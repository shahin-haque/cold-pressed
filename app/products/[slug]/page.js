"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { products, getProductBySlug } from "../../data/products";

export default function ProductDetailPage(props) {
  const params = use(props.params);
  const product = getProductBySlug(params.slug) || products[0];
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const { addToCart: addToCartContext } = useCart();

  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const currentPrice = product.size[selectedSize]?.price || product.price;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCartContext(product, product.size[selectedSize], quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className='pt-16 md:pt-20'>
      <Breadcrumb product={product} />

      <section className='section bg-white'>
        <div className='container-custom'>
          <div className='grid lg:grid-cols-2 gap-12'>
            <ProductImage product={product} />

            <ProductDetails
              product={product}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              quantity={quantity}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              handleAddToCart={handleAddToCart}
              addedToCart={addedToCart}
              currentPrice={currentPrice}
            />
          </div>
        </div>
      </section>

      <ProductTabs product={product} />
      <RelatedProducts products={relatedProducts} />
      <BestValueCTA />
    </main>
  );
}

function Breadcrumb({ product }) {
  return (
    <div className='bg-muted py-4'>
      <div className='container-custom'>
        <nav className='flex items-center gap-2 text-sm'>
          <Link href='/' className='text-gray-500 hover:text-primary'>
            Home
          </Link>
          <span className='text-gray-400'>/</span>
          <Link href='/products' className='text-gray-500 hover:text-primary'>
            Shop
          </Link>
          <span className='text-gray-400'>/</span>
          <span className='font-medium'>{product.name}</span>
        </nav>
      </div>
    </div>
  );
}

function ProductImage({ product }) {
  return (
    <div className='relative'>
      <div className='aspect-square rounded-3xl overflow-hidden bg-gray-100'>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className='object-cover'
          priority
          sizes='(max-width: 1024px) 100vw, 50vw'
        />
      </div>
      {product.badge && (
        <span className='absolute top-6 left-6 px-4 py-2 bg-primary text-white font-semibold rounded-full'>
          {product.badge}
        </span>
      )}
    </div>
  );
}

function ProductDetails({
  product,
  selectedSize,
  setSelectedSize,
  quantity,
  handleDecrease,
  handleIncrease,
  handleAddToCart,
  addedToCart,
  currentPrice,
}) {
  return (
    <div>
      <h1 className='text-4xl font-bold mb-2'>{product.name}</h1>
      <p className='text-xl text-gray-500 mb-4'>{product.tagline}</p>

      <div className='flex items-center gap-2 mb-6'>
        <div className='flex'>
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className='w-5 h-5 text-accent'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 9.16c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
          ))}
        </div>
        <span className='text-gray-500'>(128 reviews)</span>
      </div>

      <p className='text-gray-600 mb-6'>{product.description}</p>

      <div className='mb-6'>
        <h3 className='font-semibold mb-3'>Key Ingredients:</h3>
        <div className='flex flex-wrap gap-2'>
          {product.benefits.map((benefit, i) => (
            <span
              key={i}
              className='px-4 py-2 bg-muted rounded-full font-medium'
            >
              {benefit}
            </span>
          ))}
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='font-semibold mb-3'>Size:</h3>
        <div className='flex gap-3'>
          {product.size.map((size, i) => (
            <button
              key={i}
              onClick={() => setSelectedSize(i)}
              className={`px-6 py-3 rounded-xl border-2 transition-all ${
                selectedSize === i
                  ? "border-primary bg-primary/10"
                  : "border-gray-200 hover:border-primary"
              }`}
            >
              <span className='font-semibold'>{size.name}</span>
              <span className='ml-2 text-primary font-bold'>${size.price}</span>
            </button>
          ))}
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-4 mb-6'>
        <div className='flex items-center gap-4'>
          <span className='font-semibold'>Quantity:</span>
          <div className='flex items-center bg-muted rounded-full'>
            <button
              onClick={handleDecrease}
              className='w-12 h-12 flex items-center justify-center hover:bg-white rounded-l-full transition-colors'
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
                  d='M20 12H4'
                />
              </svg>
            </button>
            <span className='w-12 text-center font-semibold'>{quantity}</span>
            <button
              onClick={handleIncrease}
              className='w-12 h-12 flex items-center justify-center hover:bg-white rounded-r-full transition-colors'
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
                  d='M12 4v16m8-8H4'
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className={`flex-1 btn-primary flex items-center justify-center gap-2 ${addedToCart ? "bg-green-600" : ""}`}
        >
          {addedToCart ? (
            <>
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
                  d='M5 13l4 4L19 7'
                />
              </svg>
              Added to Cart!
            </>
          ) : (
            <>
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
              Add to Cart - ${(currentPrice * quantity).toFixed(2)}
            </>
          )}
        </button>
      </div>

      <div className='grid grid-cols-3 gap-4 p-4 bg-muted rounded-xl'>
        <div className='text-center'>
          <div className='text-2xl mb-1'>🚚</div>
          <div className='text-sm font-medium'>Free Shipping</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl mb-1'>✅</div>
          <div className='text-sm font-medium'>30-Day Returns</div>
        </div>
        <div className='text-center'>
          <div className='text-2xl mb-1'>❄️</div>
          <div className='text-sm font-medium'>Cold Pressed</div>
        </div>
      </div>
    </div>
  );
}

function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Nutrition", "Ingredients", "How It's Made", "Reviews"];

  return (
    <section className='section bg-muted'>
      <div className='container-custom'>
        <div className='bg-white rounded-2xl p-8'>
          <div className='flex border-b mb-8 overflow-x-auto'>
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
                  activeTab === index
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 0 && (
            <div className='grid md:grid-cols-2 gap-8'>
              <div>
                <h3 className='font-bold text-xl mb-4'>Nutrition Facts</h3>
                <p className='text-sm text-gray-500 mb-4'>
                  Per serving (500ml)
                </p>
                <div className='space-y-3'>
                  <div className='flex justify-between py-2 border-b'>
                    <span>Calories</span>
                    <span className='font-semibold'>
                      {product.nutritionalInfo.calories}
                    </span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span>Protein</span>
                    <span className='font-semibold'>
                      {product.nutritionalInfo.protein}g
                    </span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span>Carbohydrates</span>
                    <span className='font-semibold'>
                      {product.nutritionalInfo.carbs}g
                    </span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span>Fiber</span>
                    <span className='font-semibold'>
                      {product.nutritionalInfo.fiber}g
                    </span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span>Vitamin C</span>
                    <span className='font-semibold'>
                      {product.nutritionalInfo.vitaminC}%
                    </span>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <span>Vitamin A</span>
                    <span className='font-semibold'>
                      {product.nutritionalInfo.vitaminA}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='font-bold text-xl mb-4'>Health Benefits</h3>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'>
                    <svg
                      className='w-5 h-5 text-green-600 mt-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span>Rich in essential vitamins and minerals</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <svg
                      className='w-5 h-5 text-green-600 mt-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span>No added sugars or preservatives</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <svg
                      className='w-5 h-5 text-green-600 mt-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span>Cold-pressed to retain nutrients</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <svg
                      className='w-5 h-5 text-green-600 mt-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span>100% organic ingredients</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div>
              <h3 className='font-bold text-xl mb-4'>Ingredients</h3>
              <p className='text-gray-600'>{product.ingredients}</p>
            </div>
          )}

          {activeTab === 2 && (
            <div>
              <h3 className='font-bold text-xl mb-4'>How It's Made</h3>
              <p className='text-gray-600'>{product.howItsMade}</p>
            </div>
          )}

          {activeTab === 3 && (
            <div>
              <h3 className='font-bold text-xl mb-4'>Customer Reviews</h3>
              <div className='space-y-4'>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <div key={review.id} className='border-b pb-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <div className='flex'>
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "text-accent" : "text-gray-300"}`}
                              fill='currentColor'
                              viewBox='0 0 20 20'
                            >
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 9.16c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                          ))}
                        </div>
                        <span className='font-medium'>{review.author}</span>
                        <span className='text-gray-400 text-sm'>
                          - {review.date}
                        </span>
                      </div>
                      <p className='text-gray-600'>{review.comment}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RelatedProducts({ products }) {
  return (
    <section className='section bg-white'>
      <div className='container-custom'>
        <h2 className='text-2xl font-bold mb-8'>You Might Also Like</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className='card group'
            >
              <div className='aspect-square relative overflow-hidden bg-gray-100 rounded-t-2xl'>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className='object-cover group-hover:scale-110 transition-transform duration-300'
                  sizes='(max-width: 768px) 50vw, 25vw'
                />
              </div>
              <div className='p-4'>
                <h3 className='font-bold mb-1'>{product.name}</h3>
                <p className='text-sm text-gray-500 mb-2'>{product.tagline}</p>
                <span className='text-lg font-bold text-primary'>
                  ${product.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestValueCTA() {
  return (
    <section className='section bg-primary text-white'>
      <div className='container-custom'>
        <div className='bg-white/10 backdrop-blur rounded-2xl p-8 text-center'>
          <div className='text-4xl mb-4'>⭐</div>
          <h2 className='text-2xl font-bold mb-4'>Get The Best Value</h2>
          <p className='text-lg mb-6 max-w-xl mx-auto'>
            Save 20% when you subscribe. Get fresh juices delivered to your door
            on your schedule. Cancel anytime—no commitments.
          </p>
          <button className='bg-white text-primary font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-all'>
            Subscribe & Save 20%
          </button>
        </div>
      </div>
    </section>
  );
}
