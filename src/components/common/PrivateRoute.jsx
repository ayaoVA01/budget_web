import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the path as necessary

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();

  if (!user) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // User is authenticated, render the component
  return element;
};

export default PrivateRoute;
