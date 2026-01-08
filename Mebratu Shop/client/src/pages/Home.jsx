import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import api from '../api/axios'; // Use our configured api instance
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Placeholder for fetching products
  useEffect(() => {
    // In the future this will be axios.get('/api/products')
    // For now we simulate or use what we can
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products'); 
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="Background" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative max-w-7xl mx-auto py-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl mb-6">
            Mebratu Shop <br/><span className="text-indigo-300 text-3xl sm:text-5xl">Everything You Need, Fast & Trusted</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mb-10">
            Smart prices. Verified products. Easy returns. Join thousands of happy customers today.
          </p>
          <div className="flex space-x-4">
             <a href="#products" className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300 shadow-lg">
               Shop Now
             </a>
             <a href="#best-sellers" className="bg-indigo-700 bg-opacity-60 text-white border border-white px-8 py-3 rounded-full font-bold hover:bg-opacity-80 transition duration-300">
               View Best Sellers
             </a>
          </div>
        </div>
      </div>

      {/* Trust / Benefits Section */}
      <div className="bg-white py-12 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                 <div className="bg-indigo-50 p-3 rounded-full mb-3 text-indigo-600">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                 </div>
                 <h3 className="font-bold text-gray-900">Fast Delivery</h3>
                 <p className="text-sm text-gray-500">2-4 Days Shipping</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="bg-indigo-50 p-3 rounded-full mb-3 text-indigo-600">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                 </div>
                 <h3 className="font-bold text-gray-900">Secure Payment</h3>
                 <p className="text-sm text-gray-500">100% Secure Checkout</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="bg-indigo-50 p-3 rounded-full mb-3 text-indigo-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                 </div>
                 <h3 className="font-bold text-gray-900">Easy Returns</h3>
                 <p className="text-sm text-gray-500">30-Day Money Back</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="bg-indigo-50 p-3 rounded-full mb-3 text-indigo-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                 </div>
                 <h3 className="font-bold text-gray-900">Verified Reviews</h3>
                 <p className="text-sm text-gray-500">Trusted by Thousands</p>
              </div>
           </div>
        </div>
      </div>

      {/* Product Section */}
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
           <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
           <a href="#view-all" className="text-indigo-600 font-semibold hover:text-indigo-800">View All Products &rarr;</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
               <div className="h-64 bg-gray-50 relative overflow-hidden">
                  <img 
                    src={product.image || "https://placehold.co/400?text=Product"} 
                    alt={product.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400?text=No+Image"; }}
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                     <span className="bg-white bg-opacity-90 backdrop-blur text-xs font-bold px-2 py-1 rounded shadow-sm text-gray-800">
                        {product.delivery_info || 'Fast Shipping'}
                     </span>
                  </div>
               </div>
               <div className="p-5 flex-1 flex flex-col">
                  {/* Category */}
                  <p className="text-xs text-indigo-600 font-semibold mb-1 uppercase tracking-wider">{product.category || 'General'}</p>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 flex-grow">{product.title}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                     <span className="text-yellow-400">★</span>
                     <span className="ml-1 text-sm font-bold text-gray-900">{product.rating || '4.5'}</span>
                     <span className="ml-1 text-sm text-gray-400">({product.review_count || 100} reviews)</span>
                  </div>
                  
                  {/* Price & CTA */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                     <div>
                        <span className="text-2xl font-bold text-gray-900">${Number(product.price).toFixed(2)}</span>
                     </div>
                     <button 
                        onClick={() => addToCart(product.id)}
                        className="bg-gray-900 text-white hover:bg-indigo-600 px-4 py-2 rounded-lg transition-colors font-medium text-sm flex items-center"
                     >
                        <ShoppingCart size={18} className="mr-2" />
                        Add to Cart
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Categories Tiles */}
      <div className="bg-indigo-50 py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
               {['Electronics', 'Fashion', 'Home', 'Beauty', 'Essentials'].map((cat) => (
                 <div key={cat} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center group">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                       {/* Simple placeholder icon */}
                       <span className="text-xl font-bold">{cat[0]}</span>
                    </div>
                    <h3 className="font-bold text-gray-900">{cat}</h3>
                 </div>
               ))}
            </div>
         </div>
      </div>

    </div>
  );
};

export default Home;
