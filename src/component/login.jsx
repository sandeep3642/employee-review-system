import React, { useState } from 'react';
import apiHelper from '../utils/apiHelper';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();
    const loginData = { email, password }
    const response = await apiHelper("/api/employee/login", "POST", loginData);
        if (response && response.status === 200) {
            localStorage.setItem("token", response.data.token);
            toast.success(response.message || "Login successful!");
            window.location.href = "/"; // Redirect to the home page
          } else {
            console.error(response.error || "An error occurred during login. Please try again.");
          }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black to-purple-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-purple-800">Login</h2>

        <form className="mt-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-purple-800 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Log In
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="font-medium text-purple-600 hover:text-purple-500">
            Sign Up
          </a>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
 