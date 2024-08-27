import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ element: Component, ...rest }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
}

export default PrivateRoute;
