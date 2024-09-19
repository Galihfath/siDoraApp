import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data dari backend "/api"
    fetch('https://fuzzy-space-pancake-gjw64rprvpj3644-5000.app.github.dev/api') // URL lengkap backend
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Debug untuk memastikan data diterima
        setMessage(data.message); // Set pesan dari backend ke state "message"
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Menangani error jika fetch gagal
      });
  }, []); // Dependency array kosong untuk memastikan fetch hanya dijalankan sekali saat komponen di-mount

  return (
    <ChakraProvider>
      <div>
        <h1>{message}</h1> {/* Menampilkan pesan dari backend */}
      </div>
    </ChakraProvider>
  );
}

export default App;
