const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Import User Model

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your_jwt_secret'; // Ganti ini dengan secret yang lebih aman

// Middleware
app.use(cors()); // Aktifkan CORS untuk semua origin
app.use(express.json()); // Middleware untuk menangani JSON

// Koneksi ke MongoDB Atlas
mongoose.connect('mongodb+srv://frgalih:Password1.@learning.jsr8l.mongodb.net/learning?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Route untuk root "/"
app.get('/', (req, res) => {
  res.send('siDORA Backend Running!');
});

// Route untuk "/api" (contoh respons)
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from siDORA Backend!' });
});

// Route untuk registrasi pengguna
app.post('/register', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Cek apakah semua field disediakan
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log("Data received:", { name, username, email, password });

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email);
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    // Buat pengguna baru
    const newUser = new User({ name, username, email, password: hashedPassword });
    await newUser.save();
    console.log("User saved to database:", newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error); // Log lebih mendetail tentang error
    res.status(500).json({ error: 'Error registering user' });
  }
});



// Route untuk login pengguna
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari pengguna berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Validasi password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Jika login berhasil, buat token JWT dan kirimkan ke client
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});


// Jalankan server di port 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
