import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add item to cart
      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existing = items.find((i) => i._id === product._id);

        if (existing) {
          // Check stock
          if (existing.quantity + quantity > product.stock) {
            toast.error(`Only ${product.stock} items available`);
            return;
          }
          set({
            items: items.map((i) =>
              i._id === product._id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          if (quantity > product.stock) {
            toast.error(`Only ${product.stock} items available`);
            return;
          }
          set({
            items: [
              ...items,
              {
                _id: product._id,
                name: product.name,
                price: product.discountPrice || product.price,
                image: product.images?.[0]?.url || '',
                stock: product.stock,
                unit: product.unit,
                quantity,
              },
            ],
          });
        }
        toast.success(`${product.name} added to cart`);
      },

      // Remove item
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i._id !== id) });
        toast.success('Item removed from cart');
      },

      // Update quantity
      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((i) =>
            i._id === id ? { ...i, quantity } : i
          ),
        });
      },

      // Clear cart
      clearCart: () => set({ items: [] }),

      // Computed values
      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      itemsPrice: () =>
        get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
      shippingPrice: () => (get().itemsPrice() > 500 ? 0 : 60),
      taxPrice: () => Math.round(get().itemsPrice() * 0.05),
      totalPrice: () =>
        get().itemsPrice() + get().shippingPrice() + get().taxPrice(),
    }),
    {
      name: 'gmart_cart',
    }
  )
);

export default useCartStore;
