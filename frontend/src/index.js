// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Gunakan Router di index.js
import App from './App';
import theme from './theme/theme';
import { UserProvider } from './context/UserContext'; // Import UserProvider dari context
import reportWebVitals from './reportWebVitals';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router> {/* Bungkus dengan BrowserRouter */}
        <UserProvider> {/* Bungkus dengan UserProvider */}
          <App /> {/* Komponen utama */}
        </UserProvider>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
