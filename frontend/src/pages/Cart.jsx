import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, itemsPrice, shippingPrice, taxPrice } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container-custom py-20 animate-fade-in flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
          <FiShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Let's find some fresh groceries!</p>
        <Link to="/products" className="btn-primary px-8 py-3 text-lg rounded-full">
          Start Shopping
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      toast.error('Please login to continue');
      navigate('/login?redirect=/checkout');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="container-custom py-10 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({items.length})</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="card divide-y divide-gray-100">
            {items.map((item) => (
              <div key={item._id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                  <img 
                    src={item.image || 'https://placehold.co/200x200'} 
                    alt={item.name} 
                    className="w-full h-full object-cover mix-blend-multiply" 
                    onError={(e) => { e.target.src = 'https://placehold.co/200x200' }}
                  />
                </div>
                
                <div className="flex-1 text-center sm:text-left w-full">
                  <Link to={`/products/${item._id}`} className="font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-gray-500 text-sm mb-3">৳{item.price.toFixed(0)} / {item.unit}</p>
                  
                  <div className="flex items-center justify-center sm:justify-between w-full">
                    <div className="flex items-center border border-gray-300 rounded-lg h-9 w-28 bg-white">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors rounded-l-lg"
                      >
                        <FiMinus size={14} />
                      </button>
                      <div className="flex-1 flex items-center justify-center font-medium text-sm text-gray-900">
                        {item.quantity}
                      </div>
                      <button 
                        onClick={() => updateQuantity(item._id, Math.min(item.stock, item.quantity + 1))}
                        className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors rounded-r-lg"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 sm:gap-0 h-full sm:py-2">
                  <span className="font-bold text-lg text-gray-900">৳{(item.price * item.quantity).toFixed(0)}</span>
                  <button 
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors mt-auto"
                    title="Remove item"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <Link to="/products" className="text-blue-600 font-medium hover:underline">
              &larr; Continue Shopping
            </Link>
            <button 
              onClick={clearCart}
              className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">৳{itemsPrice().toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">
                  {shippingPrice() === 0 ? <span className="text-green-600">Free</span> : `৳${shippingPrice().toFixed(0)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (5%)</span>
                <span className="font-medium text-gray-900">৳{taxPrice().toFixed(0)}</span>
              </div>
            </div>
            
            <hr className="border-gray-100 mb-6" />
            
            <div className="flex justify-between mb-8">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-blue-600">৳{totalPrice().toFixed(0)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="btn-primary w-full py-3.5 text-lg flex items-center justify-center gap-2 rounded-xl shadow-blue-500/30 shadow-lg hover:shadow-xl transition-all"
            >
              Proceed to Checkout <FiArrowRight />
            </button>
            
            {shippingPrice() > 0 && (
              <p className="text-xs text-center text-gray-500 mt-4">
                Add ৳{(500 - itemsPrice()).toFixed(0)} more for free shipping!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
