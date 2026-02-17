import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const Cancel = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <XCircle size={80} className="text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        You have cancelled the checkout process. No charges were made.
      </p>
      <div className="flex space-x-4">
        <Link to="/cart" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
          Return to Cart
        </Link>
        <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
