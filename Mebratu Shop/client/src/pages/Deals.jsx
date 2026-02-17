import React from 'react';
import { Link } from 'react-router-dom';

const Deals = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
       <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-16 text-center transform hover:scale-[1.01] transition-transform duration-300">
          <div className="inline-block p-4 bg-red-100 rounded-full text-red-600 mb-6">
             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Flash Deals incoming!</h1>
          <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto">
             We are curating the best offers for you. Currently, check out our sales on the <span className="font-bold text-indigo-600">Products</span> page by looking for the red badge!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/products" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30">
                Browse Products
             </Link>
             <Link to="/" className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition">
                Back Home
             </Link>
          </div>
       </div>
    </div>
  );
};

export default Deals;
