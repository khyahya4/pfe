import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Register = ({ setUser }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "gestionnaire de stock"// default role
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); // Clear previous errors

  // Check if passwords match
  if (formData.password !== formData.confirmPassword) {
    return setError("Passwords do not match");
  }

  try {
    // We remove confirmPassword before sending to the API
    // so the backend only receives what it needs
    const { confirmPassword, ...dataToSend } = formData;

    const response = await api.post("/users/register", dataToSend);

    localStorage.setItem("token", response.data.token);
    setUser(response.data);
    if (response.data.role === "Administrateur") {
  navigate("/admin");
} else {
  navigate("/ges");
}
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200">
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
             {/* Role Selection */}
<div className="space-y-2">
  <label className="block text-left text-lg font-semibold text-gray-800">
    Type de Compte
  </label>
  <div className="flex items-center space-x-6">
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name="role"
        value="gestionnaire de stock"
        checked={formData.role === "gestionnaire de stock"}
        onChange={handleChange}
        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
      />
      <span className="ml-2 text-gray-700">Gestionnaire de stock</span>
    </label>

    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name="role"
        value="Administrateur"
        checked={formData.role === "Administrateur"}
        onChange={handleChange}
        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
      />
      <span className="ml-2 text-gray-700">Administrateur</span>
    </label>
  </div>
</div>
          {/* username */}
          <div>
            <label className="block text-left text-lg font-semibold text-gray-800 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
       
           {/* Email */}
          <div>
            <label className="block text-left text-lg font-semibold text-gray-800 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-left text-lg font-semibold text-gray-800 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Confirm Password */}
<div>
  <label className="block text-left text-lg font-semibold text-gray-800 mb-2">
    Confirm Password
  </label>
  <input
    type="password"
    name="confirmPassword"
    placeholder="Confirm your password"
    value={formData.confirmPassword}
    onChange={handleChange}
    required
    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
  />
</div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 font-semibold"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
};

export default Register;