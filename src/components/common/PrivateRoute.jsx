import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Loading from '../loading/Loading'
const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Render a loading indicator while fetching session
    return <div><Loading/></div>;
  }

  if (!user) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/" />;
  }

  // User is authenticated, render the component
  return element;
};

export default PrivateRoute;
