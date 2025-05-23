import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Task Manager</h1>
        <p className="text-gray-600 mb-8">Welcome! Please log in or register to manage your tasks.</p>
        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-semibold transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
