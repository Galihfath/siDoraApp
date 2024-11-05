import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // Jika token tidak ada, redirect ke halaman login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Jika token ada, izinkan akses ke halaman yang diminta
  return children;
}

export default PrivateRoute;