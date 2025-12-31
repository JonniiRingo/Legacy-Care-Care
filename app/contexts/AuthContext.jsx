'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

    const AuthContext = createContext(null);

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      }, []);

      const login = (userData) => {
        localStorage.setItem('authUser', JSON.stringify(userData));
        setUser(userData);
      };

      const logout = () => {
        localStorage.removeItem('authUser');
        setUser(null);
      };

      return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
          {children}
        </AuthContext.Provider>
      );
    };

    export const useAuth = () => useContext(AuthContext);
  