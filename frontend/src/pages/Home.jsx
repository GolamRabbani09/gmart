import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ui/ProductCard';
import { FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await productAPI.getAll({ featured: true, limit: 8 });
        setFeaturedProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const categories = [
    { name: 'Fruits & Vegetables', icon: '🍎', color: 'bg-red-100' },
    { name: 'Dairy & Eggs', icon: '🥛', color: 'bg-yellow-100' },
    { name: 'Meat & Fish', icon: '🥩', color: 'bg-rose-100' },
    { name: 'Bakery', icon: '🍞', color: 'bg-amber-100' },
    { name: 'Beverages', icon: '🥤', color: 'bg-blue-100' },
    { name: 'Snacks', icon: '🍪', color: 'bg-orange-100' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <section className="bg-blue-50 py-12 sm:py-20">
        <div className="container-custom flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
              Fresh Groceries <br className="hidden sm:block" />
              Delivered to <span className="text-blue-600">Your Door</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-lg">
              Shop from our wide selection of fresh produce, dairy, meat, and everyday essentials. Fast delivery guaranteed.
            </p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-3 rounded-full">
              Shop Now <FiArrowRight />
            </Link>
          </div>
          <div className="flex-1">
            <div className="w-full h-64 sm:h-96 bg-blue-200 rounded-3xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" 
                alt="Fresh Groceries" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 container-custom">
        <h2 className="section-title">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className={`${cat.color} rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform duration-300`}
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-semibold text-gray-800 text-sm">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-8">
            <h2 className="section-title mb-0">Featured Products</h2>
            <Link to="/products?featured=true" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
              View All <FiArrowRight size={16} />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
              {featuredProducts.length === 0 && (
                <p className="text-gray-500 col-span-full text-center py-12">No featured products found.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
