import React, { useState } from "react";

const Login = () => {
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form>
            <div>
            <label className="block text-gray-700 mb-2">
                Email
            </label>
            <input className="w-full p-3 border-gray" type="email" />
            </div>

        </form>
      </div>
    </div>
  );
};

export default Login;