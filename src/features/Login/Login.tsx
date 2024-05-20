import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = 'https://chola-web-app.azurewebsites.net/api';

interface Props {
  onLogin: () => void; // Define the type for the onLogin prop
}

const Login: React.FC<Props> = ({ onLogin }) => { // Receive the onLogin prop
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/admin-login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const token = response.data.jwt;
      localStorage.setItem('jwtToken', token);
      onLogin(); // Call the onLogin function
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center
     justify-center h-screen bg-gray-950">
      <form
        className="bg-white w-[400px] 
        p-8 rounded-lg shadow-purple-500 shadow-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Password"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-[200px] 
            ml-[60px] bg-black 
            hover:bg-[#5A31A6]
             text-white font-bold 
             py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;