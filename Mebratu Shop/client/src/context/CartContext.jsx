import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = React.useCallback(async () => {
    if (!user) {
        setCartItems([]);
        return;
    }
    try {
      setLoading(true);
      const res = await api.get('/cart');
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Error fetching cart", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product_id, qty = 1) => {
    console.log('Frontend addToCart called with:', { product_id, qty });
    if (!user) {
        toast.error("Please login to add to cart");
        return;
    }
    try {
      await api.post('/cart', { product_id, qty });
      await fetchCart(); // Refresh cart
      toast.success("Added to cart");
    } catch (err) {
      console.error("Error adding to cart", err);
      toast.error("Failed to add to cart");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      await fetchCart();
    } catch (err) {
      console.error("Error removing from cart", err);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.qty), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCount, cartTotal, loading }}>
      {children}
    </CartContext.Provider>
  );
};
