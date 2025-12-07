import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
    useCart();
  const { user } = useAuth();
  const total = getTotalPrice();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center animate-fade-in-up">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-6xl">🛒</span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 text-xl mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Let's change that!
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-3 btn-primary text-xl px-8 py-4 shadow-2xl"
            >
              <FiArrowLeft size={24} />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-slide-in-left">
          <h1 className="text-5xl font-black text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600 text-lg mb-12">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 animate-slide-in-left">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="border-b last:border-b-0 border-gray-100/50 p-6 sm:p-8 flex gap-6 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg">
                      {item.title}
                    </h3>
                    <p className="gradient-text font-black text-xl">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 transition-all duration-300 p-2 rounded-lg hover:bg-red-50 transform hover:scale-110"
                    >
                      <FiTrash2 size={20} />
                    </button>

                    <div className="flex items-center bg-gray-100 rounded-xl border border-gray-200 overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors font-bold text-lg"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 text-sm font-bold bg-white min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors font-bold text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-max">
                    <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                    <p className="font-black text-xl gradient-text">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-700 font-bold mt-8 text-lg transition-all duration-300 hover:translate-x-2"
            >
              <FiArrowLeft size={24} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 animate-slide-in-right">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 sticky top-24 border border-white/50">
              <h2 className="text-3xl font-black text-gray-900 mb-8">Order Summary</h2>

              <div className="space-y-6 mb-8 pb-8 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 font-medium">Subtotal</p>
                  <p className="font-bold text-lg">${total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 font-medium">Shipping</p>
                  <p className="font-bold text-green-600 text-lg">FREE</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 font-medium">Tax</p>
                  <p className="font-bold text-lg">${(total * 0.1).toFixed(2)}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <p className="text-2xl font-black text-gray-900">Total</p>
                <p className="text-4xl font-black gradient-text">
                  ${(total * 1.1).toFixed(2)}
                </p>
              </div>

              {user ? (
                <Link
                  to="/checkout"
                  className="w-full btn-primary text-center text-xl py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="w-full btn-primary text-center text-xl py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105"
                >
                  Sign In to Checkout
                </Link>
              )}

              <button
                onClick={clearCart}
                className="w-full mt-4 border-2 border-red-500 text-red-500 hover:bg-red-50 font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:border-red-600 hover:text-red-600 transform hover:scale-105"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
