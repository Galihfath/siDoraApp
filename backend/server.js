const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Import User Model

const app = express();
const PORT = process.env.PORT || 5000;

// Koneksi ke MongoDB Atlas
mongoose.connect('mongodb+srv://frgalih:Password1.@learning.jsr8l.mongodb.net/learning?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Aktifkan CORS untuk semua origin
app.use(cors());
app.use(express.json()); // Middleware untuk menangani JSON

// Route untuk root "/"
app.get('/', (req, res) => {
  res.send('siDORA Backend Running!');
});

// Route untuk "/api" (contoh respons)
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from siDORA Backend!' });
});

// Route untuk "register" pengguna
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Jalankan server di port 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
