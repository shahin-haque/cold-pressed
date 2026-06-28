'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { products, categories } from '../data/products';

const priceRanges = [
  { id: 'under10', name: 'Under $10', min: 0, max: 10 },
  { id: '10to15', name: '$10 - $15', min: 10, max: 15 },
  { id: 'over15', name: 'Over $15', min: 15, max: Infinity },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sortBy, setSortBy] = useState('best-selling');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedPrices.length > 0) {
      result = result.filter(p => {
        return selectedPrices.some(priceId => {
          const range = priceRanges.find(r => r.id === priceId);
          return p.price >= range.min && p.price < range.max;
        });
      });
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, selectedPrices, sortBy]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handlePriceChange = (priceId) => {
    setSelectedPrices(prev =>
      prev.includes(priceId)
        ? prev.filter(id => id !== priceId)
        : [...prev, priceId]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedPrices([]);
    setSortBy('best-selling');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedPrices.length > 0;

  return (
    <main className="pt-16 md:pt-20">
      <PageHeader />

      <div className="bg-white border-b sticky top-16 md:top-20 z-10 lg:hidden">
        <div className="container-custom py-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-muted text-gray-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-full lg:w-56 flex-shrink-0">
              <div className="bg-muted rounded-2xl p-6 sticky top-40">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => handleCategoryClick(category.id)}
                        className={`flex items-center justify-between w-full px-4 py-2 rounded-xl transition-colors text-left ${
                          selectedCategory === category.id
                            ? 'bg-primary text-white'
                            : 'hover:bg-white'
                        }`}
                      >
                        <span className="font-medium">{category.name}</span>
                        <span className={`text-sm ${selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'}`}>
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <h3 className="font-bold text-lg mt-8 mb-4">Price</h3>
                <div className="space-y-2">
                  {priceRanges.map((price) => (
                    <label
                      key={price.id}
                      className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-xl transition-colors ${
                        selectedPrices.includes(price.id) ? 'bg-primary text-white' : 'hover:bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPrices.includes(price.id)}
                        onChange={() => handlePriceChange(price.id)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="font-medium text-sm">{price.name}</span>
                    </label>
                  ))}
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full mt-6 px-4 py-2 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-6 lg:hidden">
                <button
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                    mobileFiltersOpen ? 'bg-primary text-white' : 'bg-muted'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span className="text-sm font-medium">Filters</span>
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-muted rounded-xl text-sm border-0 focus:ring-2 focus:ring-primary"
                >
                  <option value="best-selling">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {mobileFiltersOpen && (
                <div className="lg:hidden bg-muted rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Filters</h3>
                    <button onClick={() => setMobileFiltersOpen(false)}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-sm">Price Range</h4>
                    <div className="flex flex-wrap gap-2">
                      {priceRanges.map((price) => (
                        <button
                          key={price.id}
                          onClick={() => handlePriceChange(price.id)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedPrices.includes(price.id)
                              ? 'bg-primary text-white'
                              : 'bg-white'
                          }`}
                        >
                          {price.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-2 border border-primary text-primary rounded-xl text-sm font-medium"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{filteredProducts.length}</span> products
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="hidden lg:block px-4 py-2 bg-muted rounded-xl text-sm border-0 focus:ring-2 focus:ring-primary"
                >
                  <option value="best-selling">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-muted rounded-2xl">
                  <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-lg">No products found</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-primary font-medium hover:underline"
                  >
                    Clear filters to see all products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <SubscriptionCTA />
    </main>
  );
}

function PageHeader() {
  return (
    <div className="bg-gradient-to-b from-[#fff5f0] to-white py-12 md:py-16">
      <div className="container-custom text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Shop Our <span className="text-primary">Juices</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our range of cold-pressed juices crafted for your wellness journey.
        </p>
      </div>
    </div>
  );
}

function ProductCard({ product, index }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, { name: '500ml', price: product.price }, 1);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="card group"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="aspect-square relative overflow-hidden bg-gray-100 rounded-t-2xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {product.badge && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-primary text-white text-xs font-semibold rounded-full z-10">
            {product.badge}
          </span>
        )}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 left-1/2 -translate-x-1/2"
        >
          <div className="px-4 py-1.5 bg-white shadow-lg rounded-full flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs font-semibold">Add</span>
          </div>
        </button>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-bold text-sm md:text-base mb-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.tagline}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {product.benefits.slice(0, 2).map((benefit, i) => (
            <span key={i} className="px-2 py-0.5 bg-muted text-xs rounded-full">
              {benefit}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">${product.price}</span>
            <span className="text-xs text-gray-500">/500ml</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SubscriptionCTA() {
  return (
    <section className="section bg-primary text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Save 20% with Subscription
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Never run out of your favorites. Get fresh juices delivered to your door.
        </p>
        <button className="bg-white text-primary font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-all text-lg">
          Start Subscription
        </button>
        <p className="mt-4 text-sm opacity-75">
          First shipment ships free with code FRESH10
        </p>
      </div>
    </section>
  );
}