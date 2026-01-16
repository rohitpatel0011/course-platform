import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check Login Status on App Start
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auto Login Error:", error);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  // 2. Login Function
  const login = async (email, password) => {
    try {
      console.log('Attempting login...', { email });

      const response = await api.post('/auth/login', {
        email,
        password
      });

      console.log('Login Response:', response.data);
      const userData = response.data;

      if (userData.token) {
        setUser(userData);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, user: userData };
      } else {
        return { success: false, error: "Token missing in response" };
      }

    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = error.response?.data?.message || 'Login failed';
      return { success: false, error: errorMsg };
    }
  };

  // 3. Register Function (With Role)
  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,

      });

      if (response.data.token) {
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, user: userData };
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed';
      return { success: false, error: errorMsg };
    }
  };

  // 4. Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};