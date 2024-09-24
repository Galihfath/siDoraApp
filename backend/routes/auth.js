const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Model User
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware untuk autentikasi pengguna berdasarkan token JWT
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan, akses ditolak' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Set user di request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
};

// Register pengguna baru
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Cek apakah pengguna sudah ada
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registrasi berhasil', user: newUser });
  } catch (error) {
    console.error('Error registrasi pengguna:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// Login pengguna
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari pengguna berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Validasi password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    // Kembalikan token dan data pengguna ke client
    res.json({ token, name: user.name });
  } catch (error) {
    console.error('Error login pengguna:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

// Route untuk update profil pengguna
router.put('/update-profile', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id; // Ambil ID pengguna dari token
    const { name, nik, jenisKelamin, agama, tempatLahir, tanggalLahir, alamat, rt, rw, provinsi, kota, kecamatan, kelurahan, kodePos, golonganDarah, pekerjaan, beratBadan, tinggiBadan, noHp } = req.body; // Ambil data dari body

    // Update pengguna di database berdasarkan ID
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name, nik, jenisKelamin, agama, tempatLahir, tanggalLahir, alamat, rt, rw, provinsi, kota, kecamatan, kelurahan, kodePos, golonganDarah, pekerjaan, beratBadan, tinggiBadan, noHp,
      },
      { new: true } // Mengembalikan data pengguna setelah diupdate
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    res.status(200).json({ message: 'Profil berhasil diperbarui', user: updatedUser });
  } catch (error) {
    console.error('Error memperbarui profil:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

module.exports = router;
