import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-white text-lg font-bold">
          pfe
        </Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="text-white">
              Login
            </Link>
            <Link to="/register" className="text-white">
              Register
            </Link>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;