import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi';
import useCartStore from '../../store/cartStore';

const ProductCard = ({ product }) => {
  const addItem = useCartStore((s) => s.addItem);

  const image = product.images?.[0]?.url || 'https://placehold.co/300x300/e2e8f0/64748b?text=No+Image';
  const effectivePrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="card group hover:shadow-md transition-all duration-300 animate-fade-in">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50">
        <Link to={`/products/${product._id}`}>
          <img
            src={image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://placehold.co/300x300/e2e8f0/64748b?text=No+Image';
            }}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && (
            <span className="badge bg-red-500 text-white">-{discountPct}%</span>
          )}
          {product.featured && (
            <span className="badge bg-blue-600 text-white">Featured</span>
          )}
          {product.stock === 0 && (
            <span className="badge bg-gray-500 text-white">Out of Stock</span>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <FiHeart size={15} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-blue-600 font-medium mb-1">{product.category}</p>
        <Link to={`/products/${product._id}`}>
          <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                size={12}
                className={
                  star <= Math.round(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.numReviews})</span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ৳{effectivePrice.toFixed(0)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through ml-1">
                ৳{product.price.toFixed(0)}
              </span>
            )}
            <span className="text-xs text-gray-500 ml-1">/{product.unit}</span>
          </div>
          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
