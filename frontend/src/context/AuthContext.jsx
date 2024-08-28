import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/auth/check-auth', { withCredentials: true });
        setIsAuthenticated(res.data.authenticated);
        if (res.data.authenticated) {
          setAuthUser(res.data.user);
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await axios.post('/api/auth/login', credentials, { withCredentials: true });
      setIsAuthenticated(true);
      setAuthUser(res.data.user);
    } catch (err) {
      console.error('Error during login:', err.response?.data?.message || err.message);
    }
  };

  const signup = async (userData) => {
    try {
      const res = await axios.post('/api/auth/signup', userData, { withCredentials: true });
      setIsAuthenticated(true);
      setAuthUser(res.data.user);
    } catch (err) {
      console.error('Error during signup:', err.response?.data?.message || err.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      setAuthUser(null);
    } catch (err) {
      console.error('Error during logout:', err.message);
    }
  };

  const handleGoogleSignIn = async (tokenId) => {
    try {
      const res = await axios.post('/api/auth/google', { tokenId }, { withCredentials: true });
      setIsAuthenticated(true);
      setAuthUser(res.data.user);
    } catch (err) {
      console.error('Error during Google sign-in:', err.response?.data?.message || err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authUser, loading, login, signup, logout, handleGoogleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};
