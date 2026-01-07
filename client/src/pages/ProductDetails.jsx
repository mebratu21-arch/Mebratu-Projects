import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../api/axios';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState('');
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`); 
        setProduct(res.data);
        setMainImage(res.data.image);
      } catch (error) {
        console.error("Error fetching product details:", error);
         try {
            // Fallback: fetch all and find
            const resAll = await api.get('/products');
            const found = resAll.data.products?.find(p => p.id === parseInt(id)) || resAll.data.find(p => p.id === parseInt(id));
            if(found) {
                setProduct(found);
                setMainImage(found.image);
            } else {
                setProduct(null);
            }
         } catch(e) {
             console.error("Fallback failed", e);
             setProduct(null);
         }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
     setAdding(true);
     await addToCart(product.id);
     setAdding(false);
  };

  const handleBuyNow = async () => {
     setAdding(true);
     // We await add to cart, then navigate
     await addToCart(product.id, 1);
     setAdding(false);
     navigate('/cart');
  };

  if (loading) return (
      <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
  );

  if (!product) return <div className="p-10 text-center">Product not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto">
        <Link to="/products" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8 font-medium transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product Image Section */}
            <div className="p-8 bg-gray-100 flex flex-col items-center justify-center relative">
               <div className="w-full h-96 relative mix-blend-multiply">
                  <img 
                    src={mainImage || product.image} 
                    alt={product.title} 
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                  />
               </div>
               {/* Thumbnail placeholder */}
               <div className="flex space-x-4 mt-8">
                  {[product.image, product.image].map((img, idx) => (
                      <button key={idx} onClick={() => setMainImage(img)} className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${mainImage === img ? 'border-indigo-600' : 'border-gray-300'}`}>
                          <img src={img || "https://placehold.co/200"} className="w-full h-full object-cover" alt="thumbnail" />
                      </button>
                  ))}
               </div>
            </div>

            {/* Product Info Section */}
            <div className="p-10 flex flex-col justify-center">
              <span className="text-sm text-indigo-500 font-bold uppercase tracking-wider mb-2">{product.category || 'General'}</span>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.title}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} className={i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <span className="ml-3 text-gray-500 font-medium">({product.review_count || 120} reviews)</span>
              </div>

              <div className="text-3xl font-bold text-gray-900 mb-6">${product.price}</div>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {product.description || "Experience premium quality with this outstanding product. Designed for durability and performance, it meets all your daily needs with style."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button 
                  onClick={handleAddToCart}
                  disabled={adding}
                  className="flex-1 bg-indigo-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-1 shadow-lg flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={24} className="mr-2" />
                  {adding ? 'Adding...' : 'Add to Cart'}
                </button>
                 <button 
                  onClick={handleBuyNow}
                  disabled={adding}
                  className="flex-1 bg-gray-100 text-gray-900 py-4 px-8 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {adding ? 'Processing...' : 'Buy Now'}
                </button>
              </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-100 pt-8">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Truck size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm">Free Delivery</p>
                            <p className="text-xs text-gray-500">Orders over $50</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <Shield size={24} />
                        </div>
                        <div>
                             <p className="font-bold text-gray-900 text-sm">2 Year Warranty</p>
                             <p className="text-xs text-gray-500">Full coverage</p>
                        </div>
                    </div>
                     <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <RotateCcw size={24} />
                        </div>
                        <div>
                             <p className="font-bold text-gray-900 text-sm">30 Day Return</p>
                             <p className="text-xs text-gray-500">Money back guarantee</p>
                        </div>
                    </div>
                </div>

            </div>
          </div>
        </div>
        
        {/* Related Products Placeholder */}
         <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1,2,3,4].map((item) => (
                    <div key={item} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="h-40 bg-gray-100 rounded-lg mb-4"></div>
                        <div className="h-4 w-3/4 bg-gray-100 rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
                    </div>
                ))}
            </div>
         </div>

      </div>
    </div>
  );
};

export default ProductDetails;
