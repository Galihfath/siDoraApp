const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();

const PORT = process.env.PORT || 5000;

// Aktifkan CORS untuk semua origin (untuk sementara)
app.use(cors()); // Mengizinkan semua origin sementara

// Middleware untuk menangani request body dalam format JSON
app.use(express.json());

// Route untuk root path "/"
app.get('/', (req, res) => {
  res.send('siDORA Backend Running!');
});

// Route untuk "/api" yang mengirimkan respons JSON
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from siDORA Backend!' });
});;

// Menjalankan server di port 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
