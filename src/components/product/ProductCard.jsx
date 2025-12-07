import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { FiShoppingCart, FiStar } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col group border border-white/50 hover:border-blue-200/50 transform hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative h-64 bg-gradient-to-br from-gray-50 to-blue-50/30 overflow-hidden flex items-center justify-center p-6 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-purple-50/50 transition-all duration-500">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-all duration-500 filter group-hover:brightness-110"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {product.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating.rate)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {product.rating.rate} <span className="text-gray-400">({product.rating.count})</span>
              </span>
            </div>
          )}

          {/* Price and Button */}
          <div className="flex justify-between items-center mt-auto">
            <div className="flex flex-col">
              <span className="text-3xl font-black gradient-text">
                ${product.price.toFixed(2)}
              </span>
              {product.price > 50 && (
                <span className="text-xs text-green-600 font-semibold">Free Shipping</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-xl group-hover:shadow-2xl"
            >
              <FiShoppingCart size={24} className="transition-transform duration-300 group-hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
