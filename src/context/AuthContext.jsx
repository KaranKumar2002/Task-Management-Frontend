import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  const login = async (email, password) => {
    try {
      const res = await fetch(`${url}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  const register = async (email, password) => {
    try {
      const res = await fetch(`${url}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      navigate('/dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
