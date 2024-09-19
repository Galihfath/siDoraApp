import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

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
            {/* Arahkan root path ("/") ke halaman login */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
