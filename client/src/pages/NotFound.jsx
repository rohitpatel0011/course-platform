import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-full mb-6">
        <FaExclamationTriangle className="text-6xl text-red-600" />
      </div>
      <h1 className="text-6xl font-black text-gray-900 dark:text-white mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-500/30"
      >
        <FaHome /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;