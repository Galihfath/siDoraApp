const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Model User
require('dotenv').config(); // Ambil variabel environment dari file .env

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ambil JWT secret dari .env

// Middleware
app.use(cors());
app.use(express.json()); // Untuk parsing JSON dari request body

// Middleware untuk autentikasi pengguna
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan, akses ditolak' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
};

// Fungsi untuk menghubungkan ke MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Terhubung ke MongoDB Atlas');
  } catch (error) {
    console.error('Error saat menghubungkan ke MongoDB:', error);
    process.exit(1);
  }
}

// Panggil fungsi untuk koneksi ke database MongoDB
connectDB();

// Route utama untuk root "/"
app.get('/', (req, res) => {
  res.send('siDORA Backend Running!');
});

// Route untuk registrasi pengguna
app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password pengguna
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Pengguna berhasil didaftarkan' });
  } catch (error) {
    console.error('Error saat registrasi:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

// Route untuk login pengguna
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari pengguna berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Pengguna tidak ditemukan' });
    }

    // Validasi password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Password salah' });
    }

    // Jika login berhasil, buat token JWT dan kirimkan ke client
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, name: user.name });
  } catch (error) {
    console.error('Error saat login:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

// Route untuk mendapatkan profil pengguna
app.get('/user/profile', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Hilangkan password dari respons
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error saat mengambil profil pengguna:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

// Route untuk memperbarui profil pengguna
app.put('/user/update', authenticateUser, async (req, res) => {
  try {
    const formData = req.body; // Ambil data yang dikirim dari frontend

    const updatedUser = await User.findByIdAndUpdate(req.user.id, formData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    res.status(200).json({ message: 'Profil berhasil diperbarui', user: updatedUser });
  } catch (error) {
    console.error('Error memperbarui profil:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

// Jalankan server pada port yang ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
