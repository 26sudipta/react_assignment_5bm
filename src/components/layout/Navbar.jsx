import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import {
  FiShoppingCart,
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
  FiLogIn
} from 'react-icons/fi';
import { BiStore } from 'react-icons/bi';
import { useState, useEffect, useMemo, useCallback } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Memoize cart count to avoid recalculations on every render
  const cartCount = useMemo(() => getTotalItems(), [getTotalItems]);

  // Debounced scroll handler for performance
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate('/');
      setMobileOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [logout, navigate]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((v) => !v);
  }, []);

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  const navLinks = useMemo(
    () => [...(user ? [{ path: '/dashboard', label: 'Dashboard', icon: FiUser }] : [])],
    [user]
  );

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-sm ${
        scrolled
          ? 'bg-white/80 border-b shadow-lg border-blue-100'
          : 'bg-white/60 border-b border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <BiStore size={28} className="text-white" />
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-tight">
                ShopHub
              </h1>
              <p className="text-xs text-gray-500 font-semibold tracking-widest">
                Premium Store
              </p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-base transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-blue-100 text-blue-700 shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300`}
                >
                  <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right actions for md+ */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {/* Cart */}
            <Link
              to="/cart"
              className={`relative p-3 rounded-lg transition-all duration-300 font-semibold flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
                isActive('/cart')
                  ? 'bg-blue-100 text-blue-700 shadow-md'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
              aria-label={`Cart with ${cartCount} items`}
            >
              <div className="relative">
                <FiShoppingCart size={24} className="transition-transform duration-300 group-hover:scale-110" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-md"
                    aria-hidden="true"
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-sm">Cart</span>
            </Link>

            <div className="hidden lg:block h-8 w-px bg-gradient-to-b from-transparent via-blue-300 to-transparent mx-2" />

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2 lg:gap-3 ml-2">
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
                    isActive('/profile')
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800 hover:from-blue-100 hover:to-blue-200'
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                    {user.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="hidden lg:block">
                    <span className="text-sm font-bold max-w-[120px] truncate block">
                      {user.email?.split('@')[0]}
                    </span>
                    <span className="text-xs opacity-75">Profile</span>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-300 font-bold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                >
                  <FiLogOut size={20} />
                  <span className="hidden lg:inline text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex gap-2 lg:gap-3 ml-2">
                <Link
                  to="/login"
                  className={`flex items-center gap-1 px-4 py-2.5 font-bold border-2 border-blue-600 rounded-lg transition-all duration-300 text-sm lg:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
                    isActive('/login')
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <FiLogIn size={18} />
                  <span className="hidden lg:inline">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-300 font-bold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 text-sm lg:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/cart"
              className={`relative p-2.5 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
                isActive('/cart') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={`Cart with ${cartCount} items`}
            >
              <div className="relative">
                <FiShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
            </Link>

            <button
              onClick={toggleMobile}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="p-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t-2 border-blue-100 shadow-xl animate-in slide-in-from-top">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-blue-100 text-blue-700 shadow-md'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300`}
                >
                  <Icon size={20} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="border-t border-gray-200 my-2" />

            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isActive('/profile')
                      ? 'bg-blue-100 text-blue-700 shadow-md'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300`}
                >
                  <FiUser size={20} />
                  <div>
                    <span className="block font-semibold">My Profile</span>
                    <span className="text-xs opacity-75">{user.email}</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-bold hover:bg-red-50 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                >
                  <FiLogOut size={20} />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center justify-center gap-2 w-full px-4 py-3 font-bold border-2 border-blue-600 rounded-lg transition-all duration-300 ${
                    isActive('/login') ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300`}
                >
                  <FiLogIn size={18} />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
