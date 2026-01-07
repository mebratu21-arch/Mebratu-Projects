import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-bold text-indigo-700">Mebratu Shop</Link>
          </div>

          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex flex-1 items-center justify-center px-8">
             <div className="relative w-full max-w-xl">
               <input 
                 type="text" 
                 placeholder="Search products, brands, deals..." 
                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
               />
               <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
             </div>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-indigo-600 font-medium">Products</Link>
            <Link to="/deals" className="text-gray-700 hover:text-indigo-600 font-medium">Deals</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">Contact</Link>
            
            <div className="flex items-center space-x-4 border-l pl-6 border-gray-300">
               {user ? (
                 <div className="flex items-center space-x-2">
                    <User size={20} className="text-gray-600" />
                    <button onClick={logout} className="text-sm font-medium text-gray-700 hover:text-red-500">Logout</button>
                 </div>
               ) : (
                 <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
                    <User size={20} />
                    <span className="font-medium">Account</span>
                 </Link>
               )}

               <Link to="/cart" className="relative group p-2">
                 <ShoppingCart size={24} className="text-gray-700 group-hover:text-indigo-600 transition" />
                 {cartCount > 0 && (
                   <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                     {cartCount}
                   </span>
                 )}
               </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <Link to="/cart" className="relative p-2 mr-4">
                 <ShoppingCart size={24} className="text-gray-700" />
                 {cartCount > 0 && (
                   <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                     {cartCount}
                   </span>
                 )}
             </Link>
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
               {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg top-20 absolute w-full z-40">
           <div className="relative w-full mb-4">
               <input 
                 type="text" 
                 placeholder="Search products..." 
                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
               />
               <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
           </div>
           <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-gray-800 font-medium py-2">Home</Link>
           <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block text-gray-800 font-medium py-2">Products</Link>
           <Link to="/deals" onClick={() => setIsMenuOpen(false)} className="block text-gray-800 font-medium py-2">Deals</Link>
           <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block text-gray-800 font-medium py-2">About</Link>
           <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block text-gray-800 font-medium py-2">Contact</Link>
           <div className="border-t pt-4">
             {user ? (
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="block w-full text-left text-red-600 font-medium py-2">Logout</button>
             ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-indigo-600 font-medium py-2">Login / Register</Link>
             )}
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
