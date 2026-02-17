import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import api from '../api/axios';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, cartTotal, loading } = useCart();
  const { user } = useAuth();
  
  const handleCheckout = async () => {
    try {
      const res = await api.post('/checkout/create-session');
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Checkout error", err);
      const errorMsg = err.response?.data?.msg || "Checkout failed. Please try again.";
      alert(errorMsg);
    }
  };

  if (!user) {
     return <div className="p-10 text-center">Please login to view your cart.</div>;
  }

  if (loading) return <div className="p-10 text-center">Loading cart...</div>;

  if (cartItems.length === 0) {
    return <div className="p-10 text-center text-xl">Your cart is empty</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Placeholder image if product image not in item join, assuming it is or we use default */}
                <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                     <img src="https://placehold.co/200" alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                   <button onClick={() => addToCart(item.product_id, -1)} className="p-2 hover:bg-gray-100"><Minus size={16}/></button>
                   <span className="px-4 font-medium">{item.qty}</span>
                   <button onClick={() => addToCart(item.product_id, 1)} className="p-2 hover:bg-gray-100"><Plus size={16}/></button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
           <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                 <span>Subtotal</span>
                 <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 font-semibold text-lg border-t pt-2">
                 <span>Total</span>
                 <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Proceed to Checkout
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
