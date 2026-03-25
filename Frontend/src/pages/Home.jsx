import React from "react";
import { Link, Navigate } from "react-router-dom";

const Home = ({ user, error }) => {

  // ✅ redirect based on role
  if (user) {
    if (user.role === "Administrateur") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/ges" />;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">

        {error && (
          <p className="text-red-500 mb-4 text-sm">{error}</p>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Welcome!
          </h2>

          {/* ✅ fixed typo */}
          <p className="text-2xl font-bold mb-6">
            Please log in or register
          </p>

          <div className="flex flex-col space-y-4 mt-6">
            <Link
              to="/login"
             className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="w-full bg-gray-400 text-white py-3 rounded-md hover:bg-gray-500 font-medium"
            >
              Register
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;