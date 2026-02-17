import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Success = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <CheckCircle size={80} className="text-green-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Thank you for your purchase. Your order has been processed correctly.
      </p>
      <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
        Continue Shopping
      </Link>
    </div>
  );
};

export default Success;
