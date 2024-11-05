// src/App.js
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import AuthRoute from './routes/AuthRoute';
import PublicRoute from './routes/PublicRoute';
import BloodLoading from './components/BloodLoading';
import Navbar from './components/Navbar';
import fetchData from './utils/fetchData'; // Import fungsi fetchData
import theme from './theme/theme';
import './App.css';

const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const HomePage = lazy(() => import('./pages/HomePage'));
const DonorDashboard = lazy(() => import('./pages/DonorDashboard'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const Profile = lazy(() => import('./pages/Profile'));
const DaftarDonor = lazy(() => import('./pages/DaftarDonor'))

function App() {
  const [message, setMessage] = useState('');
  const location = useLocation();

  // Fetch data dari server
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

  // Menentukan kapan Navbar ditampilkan
  const showNavbar = !['/login', '/register'].includes(location.pathname);

  return (
    <ChakraProvider theme={theme}>
      <div>
        {showNavbar && <Navbar />}
        <div style={{ marginTop: showNavbar ? '60px' : '0' }}>
          <h1>{message}</h1>
          <Suspense fallback={<BloodLoading />}>
            <Routes>
              {/* Route Publik */}
              <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
              
              {/* Route Auth (Login & Register) */}
              <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
              <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />

              {/* Route Privat (Dashboard & Profil) */}
              <Route path="/dashboard" element={<PrivateRoute><DonorDashboard /></PrivateRoute>} />
              <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/daftar-donor" element={<PrivateRoute><DaftarDonor /></PrivateRoute>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
