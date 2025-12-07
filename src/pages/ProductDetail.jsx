import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../hooks/useCart';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-semibold">Fetching product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 font-black text-2xl">!</span>
          </div>
          <p className="text-red-600 text-lg mb-6 font-semibold">{error || 'Product not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-bold transition-all duration-300 hover:translate-x-1"
        >
          <FiArrowLeft size={20} />
          Back to Products
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-8 shadow-lg">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 max-w-full object-contain"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div className="animate-fade-in-up">
                <p className="text-sm text-gray-600 mb-2">
                  Category: <span className="font-semibold">{product.category}</span>
                </p>
                <h1 className="text-5xl font-black text-gray-900 mb-4 leading-tight">{product.title}</h1>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${i < Math.round(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-lg text-gray-600">
                      {product.rating.rate} out of 5 ({product.rating.count} reviews)
                    </span>
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {product.description}
                </p>
              </div>

              {/* Price and Actions */}
              <div className="border-t pt-8">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Price</p>
                  <p className="text-5xl font-black gradient-text">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6 flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 text-lg font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary flex items-center justify-center gap-3 text-xl py-4"
                >
                  <FiShoppingCart size={24} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
