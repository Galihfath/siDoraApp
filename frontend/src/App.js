// App.js
import React, { useEffect, useState, Suspense, lazy } from 'react'; 
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import BloodLoading from './components/BloodLoading';
import theme from './theme/theme'; // Import tema dari folder src/theme
import './app.css'; 

// Lazy loading untuk komponen
const Register = lazy(() => import('./Register'));
const Login = lazy(() => import('./Login'));
const HomePage = lazy(() => import('./HomePage'));
const DonorDashboard = lazy(() => import('./DonorDashboard'));
const EditProfile = lazy(() => import('./EditProfile'));
const Profile = lazy(() => import('./Profile'));

function App() {
  const [message, setMessage] = useState('');

  // Fetch data dari backend saat komponen di-mount
  useEffect(() => {
    fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/api')
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message); // Data pesan dari backend
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ChakraProvider theme={theme}> {/* Gunakan tema dari theme.js */}
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
  );
}

export default App;
