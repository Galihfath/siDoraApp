// src/routes/AuthRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Misalnya, cek token di localStorage

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default AuthRoute;
