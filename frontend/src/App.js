import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/api') // URL backend dari Codespace
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message); // Tampilkan pesan dari backend
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);// Dependency array kosong untuk memastikan fetch hanya dijalankan sekali saat komponen di-mount

  return (
    <ChakraProvider>
      <div>
        <h1>{message}</h1> {/* Menampilkan pesan dari backend */}
      </div>
    </ChakraProvider>
  );
}

export default App;
