import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import useCartStore from '../store/cartStore';
import { FiMinus, FiPlus, FiShoppingCart, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await productAPI.getById(id);
        setProduct(data.product);
      } catch (error) {
        console.error('Failed to fetch product', error);
        toast.error('Product not found');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return <div className="flex justify-center py-32"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!product) return null;

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const effectivePrice = product.discountPrice || product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="container-custom py-10 animate-fade-in">
      <div className="card p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center relative">
              {hasDiscount && (
                <span className="absolute top-4 left-4 badge bg-red-500 text-white text-sm px-3 py-1 z-10">
                  -{discountPct}% OFF
                </span>
              )}
              <img 
                src={product.images?.[activeImage]?.url || 'https://placehold.co/600x600/e2e8f0/64748b?text=No+Image'} 
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
                onError={(e) => { e.target.src = 'https://placehold.co/600x600/e2e8f0/64748b?text=No+Image' }}
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 ${activeImage === idx ? 'border-blue-600' : 'border-transparent'}`}
                  >
                    <img src={img.url} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">{product.category}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <FiStar className="text-yellow-400 fill-yellow-400" size={18} />
                <span className="font-bold text-gray-900">{product.rating?.toFixed(1)}</span>
                <span className="text-gray-500 text-sm">({product.numReviews} reviews)</span>
              </div>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium bg-green-50 px-2.5 py-0.5 rounded-full text-sm">In Stock ({product.stock})</span>
              ) : (
                <span className="text-red-600 font-medium bg-red-50 px-2.5 py-0.5 rounded-full text-sm">Out of Stock</span>
              )}
            </div>

            <div className="mb-8">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">৳{effectivePrice.toFixed(0)}</span>
                {hasDiscount && (
                  <span className="text-xl text-gray-400 line-through mb-1">৳{product.price.toFixed(0)}</span>
                )}
                <span className="text-gray-500 mb-1">/ {product.unit}</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            <hr className="border-gray-100 mb-8" />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <div className="flex items-center border border-gray-300 rounded-lg h-12 w-full sm:w-32 shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors rounded-l-lg"
                >
                  <FiMinus />
                </button>
                <div className="flex-1 flex items-center justify-center font-semibold text-gray-900">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors rounded-r-lg"
                >
                  <FiPlus />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn-primary flex-1 h-12 flex items-center justify-center gap-2 text-lg shadow-blue-500/30 shadow-lg hover:shadow-xl transition-all"
              >
                <FiShoppingCart /> {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
            
            {/* Delivery Info */}
            <div className="mt-8 bg-gray-50 p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="text-xl">🚚</span> <span>Free delivery on orders over ৳500</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="text-xl">🛡️</span> <span>100% freshness guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
