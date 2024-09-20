const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// Fungsi registrasi untuk pengguna Pendonor (frontend)
router.post('/register', async (req, res) => {  // Tambahkan async di sini
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      role: 'Pendonor',  // Set as 'Pendonor' by default
    });

    await newUser.save();

    res.status(201).json({ message: 'Registrasi berhasil' });
  } catch (error) {
    console.error('Error during registration:', error); // Log error di server
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
});

module.exports = router;
