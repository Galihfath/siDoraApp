// src/App.js
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import BloodLoading from './components/BloodLoading';
import Navbar from './components/Navbar';
import fetchData from './utils/fetchData'; // Import fungsi fetchData
import theme from './theme/theme';
import './App.css';

const Register = lazy(() => import('./Register'));
const Login = lazy(() => import('./Login'));
const HomePage = lazy(() => import('./HomePage'));
const DonorDashboard = lazy(() => import('./DonorDashboard'));
const EditProfile = lazy(() => import('./EditProfile'));
const Profile = lazy(() => import('./Profile'));

function App() {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const getMessage = async () => {
      try {
        const data = await fetchData('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/api');
        setMessage(data.message); // Set message dari hasil fetchData
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getMessage(); // Panggil fungsi getMessage saat komponen pertama kali dimuat
  }, []);

  const showNavbar = !['/login', '/register', '/'].includes(location.pathname);

  return (
    <ChakraProvider theme={theme}>
      <div>
        {showNavbar && <Navbar />}
        <div style={{ marginTop: showNavbar ? '60px' : '0' }}>
          <h1>{message}</h1>
          <Suspense fallback={<BloodLoading />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <DonorDashboard />
                </PrivateRoute>
              } />
              <Route path="/edit-profile" element={
                <PrivateRoute><EditProfile /></PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute><Profile /></PrivateRoute>
              } />
            </Routes>
          </Suspense>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
