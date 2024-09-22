const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Import User Model
require('dotenv').config(); // Untuk mengakses variabel dari .env

const authenticateAdmin = require('./middleware/authenticateAdmin'); // Impor middleware admin
const adminRoutes = require('./routes/admin'); // Impor routes untuk admin
const authRoutes = require('./routes/auth'); // Impor routes untuk auth

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ambil JWT secret dari .env
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

// Rute untuk memperbarui profil pengguna
app.put('/user/update', authenticateUser, async (req, res) => {
  try {
    const { formData } = req.body;
    
    // Cari dan perbarui pengguna berdasarkan ID pengguna dari JWT
    const updatedUser = await User.findByIdAndUpdate(req.user.id, formData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    res.status(200).json({ message: 'Profil berhasil diperbarui', user: updatedUser });
  } catch (error) {
    console.error('Error memperbarui profil:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});
// Middleware
app.use(cors()); // Aktifkan CORS untuk semua origin
app.use(express.json()); // Middleware untuk menangani JSON

// Fungsi untuk menghubungkan ke MongoDB Atlas
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Keluar dari aplikasi jika tidak bisa terhubung ke DB
  }
}
// Route untuk memperbarui profil pengguna
app.put('/user/update', authenticateUser, async (req, res) => {
  try {
    const formData = req.body; // Access entire req.body

    // Find and update the user based on the ID from the JWT
    const updatedUser = await User.findByIdAndUpdate(req.user.id, formData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Panggil fungsi untuk menghubungkan ke MongoDB
connectDB();

// Route untuk root "/"
app.get('/', (req, res) => {
  res.send('siDORA Backend Running!');
});

// Gunakan rute auth untuk registrasi dan login
app.use('/auth', authRoutes);

// Gunakan rute admin, dilindungi oleh middleware authenticateAdmin
app.use('/admin', authenticateAdmin, adminRoutes);

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

    // Jika login berhasil, buat token JWT dan kirimkan ke client bersama nama pengguna
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    
    // Kembalikan token dan nama pengguna ke client
    res.json({ token, name: user.name });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Jalankan server di port yang ditentukan
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
