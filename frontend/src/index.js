// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider dari Chakra UI
import theme from './theme/theme'; // Import tema dari folder src/theme
import App from './App';
import reportWebVitals from './reportWebVitals';

// Buat root element untuk React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render aplikasi dengan ChakraProvider dan tema kustom
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}> {/* Bungkus aplikasi dengan ChakraProvider */}
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// Mengaktifkan logging performa aplikasi (opsional)
reportWebVitals();
