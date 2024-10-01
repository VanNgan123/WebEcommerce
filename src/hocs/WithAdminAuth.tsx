import React from 'react';
import { Navigate } from 'react-router-dom';

const WithAdminAuth = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
  return (props: P) => {
    const userRole = localStorage.getItem('userRole'); // Get role from localStorage
    // Check if user has admin role
    if (userRole !== 'admin') {
      return <Navigate to="/" />; // Redirect to home if not an admin
    }
    // If user is admin, render the component
    return <Component {...props} />;
  };
};

export default WithAdminAuth;
