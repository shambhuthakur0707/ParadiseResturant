import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('paradise_token');
      const storedUser = localStorage.getItem('paradise_user');

      if (token && storedUser) {
        try {
          // Verify token is still valid by calling /api/auth/me
          const res = await getMe();
          setUser(res.data.data);
        } catch {
          // Token expired or invalid
          localStorage.removeItem('paradise_token');
          localStorage.removeItem('paradise_user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('paradise_token', token);
    localStorage.setItem('paradise_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('paradise_token');
    localStorage.removeItem('paradise_user');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
