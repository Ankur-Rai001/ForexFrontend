// src/pages/NotFound.jsx
import { AlertTriangle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 bg-gray-900 text-white text-center px-4">
      <AlertTriangle className="h-24 w-24 text-yellow-400 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="mb-6 text-gray-300">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-600 px-5 py-2 rounded font-semibold">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
