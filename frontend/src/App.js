import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import HomePage from './HomePage';
import DonorDashboard from './DonorDashboard';
import PrivateRoute from './PrivateRoute';
import EditProfile from './EditProfile';

function App() {
  const [message, setMessage] = useState('');

  // Fetch data dari backend saat komponen di-mount
  useEffect(() => {
    fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/api') // URL backend dari Codespace
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message); // Tampilkan pesan dari backend
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <div>
          <h1>{message}</h1> {/* Menampilkan pesan dari backend */}
          <Routes>
            {/* Arahkan root path ("/") ke halaman HomePage */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DonorDashboard />
              </PrivateRoute> } 
            />
            <Route path="/edit-profile" element={
              <PrivateRoute><EditProfile /></PrivateRoute>} 
            />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
