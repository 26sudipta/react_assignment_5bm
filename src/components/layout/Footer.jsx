import { Link } from 'react-router-dom';
import { BiStore } from 'react-icons/bi';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <BiStore size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                ShopHub
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop shop for premium products at unbeatable prices. Quality guaranteed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition duration-300 font-medium">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-blue-400 transition duration-300 font-medium">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 font-medium">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 font-medium">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 font-medium">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 font-medium">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 font-medium">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 font-medium">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <FiMail size={18} className="text-blue-400" />
                <a href="mailto:info@shophub.com" className="text-gray-400 hover:text-blue-400 transition duration-300 font-medium">
                  info@shophub.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone size={18} className="text-blue-400" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-blue-400 transition duration-300 font-medium">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMapPin size={18} className="text-blue-400" />
                <span className="text-gray-400 font-medium">123 Shopping St, USA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center sm:text-left mb-4 sm:mb-0">
            &copy; {currentYear} ShopHub. All rights reserved. | Crafted with ❤️ for shoppers
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
