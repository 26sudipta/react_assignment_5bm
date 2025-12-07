import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/product/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(['all', ...response.data]);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = 'https://fakestoreapi.com/products';
        if (category !== 'all') {
          url += `/category/${category}`;
        }
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="gradient-text">ShopHub</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 font-light mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover extraordinary products crafted for modern living.
              <span className="block text-white font-medium mt-2">Quality meets innovation.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-primary text-lg px-8 py-4 shadow-2xl">
                Explore Collection
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Learn More
              </button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Category Filter */}
        <div className="mb-16 animate-slide-in-left">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Shop by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find exactly what you're looking for with our curated collections
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {categories.map((cat, index) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-4 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${
                  category === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl scale-105'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 border-2 border-gray-200/50 hover:border-blue-300 hover:bg-white hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-32">
            <div className="text-center animate-fade-in-up">
              <div className="spinner mx-auto mb-6"></div>
              <p className="text-gray-600 text-xl font-semibold">Curating amazing products...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-700 px-8 py-6 rounded-2xl mb-12 shadow-lg animate-slide-in-right">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold">!</span>
              </div>
              <p className="font-bold text-lg">Oops! Something went wrong</p>
            </div>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="animate-fade-in-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Products */}
        {!loading && products.length === 0 && (
          <div className="text-center py-32 animate-fade-in-up">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 text-lg">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}
