import { Link } from 'react-router-dom';
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
} from 'react-icons/fi';

const Footer = () => {
  const categories = [
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Meat & Fish',
    'Bakery',
    'Beverages',
    'Snacks',
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="bg-blue-600 py-10">
        <div className="container-custom text-center">
          <h3 className="text-white font-bold text-xl mb-2">
            Subscribe for exclusive deals!
          </h3>
          <p className="text-blue-100 text-sm mb-4">
            Get weekly offers and fresh product updates.
          </p>
          <form className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 rounded-lg text-gray-900 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">G</span>
              </div>
              <span className="text-white font-black text-xl">G-Mart</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Bangladesh&apos;s trusted online grocery store. Fresh products
              delivered to your door.
            </p>
            <div className="flex gap-3">
              {[FiFacebook, FiTwitter, FiInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Shop' },
                { to: '/cart', label: 'Cart' },
                { to: '/orders', label: 'My Orders' },
                { to: '/login', label: 'Login' },
                { to: '/register', label: 'Register' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FiMapPin size={15} className="mt-0.5 text-blue-400 shrink-0" />
                <span>123 Gulshan Avenue, Dhaka 1212, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone size={15} className="text-blue-400 shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail size={15} className="text-blue-400 shrink-0" />
                <span>support@gmart.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} G-Mart. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
