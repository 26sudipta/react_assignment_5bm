import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { FiShoppingCart } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden h-full flex flex-col group border border-gray-100">
        {/* Image Container */}
        <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden flex items-center justify-center p-4 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-blue-100 transition duration-300">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition">
            {product.title}
          </h3>

          <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-4 flex-grow">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < Math.round(product.rating.rate)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          )}

          {/* Price and Button */}
          <div className="flex justify-between items-center mt-auto">
            <span className="text-2xl sm:text-3xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-lg transition duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
            >
              <FiShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
