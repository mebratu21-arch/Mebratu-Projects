import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { ShoppingCart, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const { addToCart } = useCart();

  useEffect(() => {
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

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Essentials'];

  const filteredProducts = products
    .filter(p => filter === 'All' || p.category === filter)
    .sort((a, b) => {
        if (sortBy === 'price-low') return Number(a.price) - Number(b.price);
        if (sortBy === 'price-high') return Number(b.price) - Number(a.price);
        if (sortBy === 'rating') return Number(b.rating) - Number(a.rating);
        return 0; // featured/default
    });

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
           <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Shop All Products</h1>
           
           <div className="flex items-center space-x-4">
              <div className="relative">
                 <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                 >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           {/* Sidebar Filters */}
           <div className="w-full lg:w-1/4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                 <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Filter size={20} className="mr-2" /> Filters
                 </h3>
                 <div className="space-y-3">
                    <p className="font-semibold text-gray-700 mb-2">Category</p>
                    {categories.map(cat => (
                       <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="category" 
                            className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            checked={filter === cat}
                            onChange={() => setFilter(cat)}
                          />
                          <span className={`${filter === cat ? 'text-indigo-600 font-medium' : 'text-gray-600'} group-hover:text-indigo-600 transition-colors`}>
                             {cat}
                          </span>
                       </label>
                    ))}
                 </div>
              </div>
           </div>

           {/* Product Grid */}
           <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col">
                     <Link to={`/products/${product.id}`} className="block h-56 bg-gray-50 relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
                        />
                        {product.id % 3 === 0 && (
                           <div className="absolute top-3 left-3">
                              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                 Sale
                              </span>
                           </div>
                        )}
                     </Link>
                     <div className="p-5 flex-1 flex flex-col">
                        <p className="text-xs text-indigo-600 font-semibold mb-1 uppercase tracking-wider">{product.category}</p>
                        <Link to={`/products/${product.id}`}>
                           <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 flex-grow group-hover:text-indigo-700 transition-colors">{product.title}</h3>
                        </Link>
                        
                        <div className="flex items-center mb-3">
                           <span className="text-yellow-400">★</span>
                           <span className="ml-1 text-sm font-bold text-gray-900">{product.rating}</span>
                           <span className="ml-1 text-sm text-gray-400">({product.review_count})</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto">
                           <span className="text-xl font-bold text-gray-900">${Number(product.price).toFixed(2)}</span>
                           <button 
                             onClick={() => addToCart(product.id)}
                             className="bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white p-2 rounded-lg transition-all duration-300"
                           >
                              <ShoppingCart size={20} />
                           </button>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
              {filteredProducts.length === 0 && (
                 <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">No products found in this category.</p>
                    <button onClick={() => setFilter('All')} className="mt-4 text-indigo-600 font-medium hover:underline">Clear Filters</button>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
