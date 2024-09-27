import React, { useEffect, useState, Suspense, lazy } from 'react'; 
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'styled-components';  // Import ThemeProvider
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import BloodLoading from './components/BloodLoading'; // Import komponen loading darah

// Lazy loading komponen
const Register = lazy(() => import('./Register'));
const Login = lazy(() => import('./Login'));
const HomePage = lazy(() => import('./HomePage'));
const DonorDashboard = lazy(() => import('./DonorDashboard'));
const EditProfile = lazy(() => import('./EditProfile'));
const Profile = lazy(() => import('./Profile'));

// Definisikan tema global
const theme = {
  colors: {
    primary: '#c75c5c',
    secondary: '#4a90e2',
    background: '#f0e5e5',
  },
};

function App() {
  const [message, setMessage] = useState('');

  // Fetch data dari backend saat komponen di-mount
  useEffect(() => {
    fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/api') 
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}> {/* Tambahkan ThemeProvider */}
      <ChakraProvider>
        <Router>
          <div>
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
        </Router>
      </ChakraProvider>
    </ThemeProvider> 
  );
}

export default App;
