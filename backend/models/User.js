const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Pastikan field name di schema sesuai
  },
  username: {
    type: String,
    required: true, // Pastikan field username di schema sesuai
    unique: true,   // Jika username harus unik, pastikan ini ditangani di frontend juga
  },
  email: {
    type: String,
    required: true, // Pastikan field email di schema sesuai
    unique: true,   // Email harus unik
  },
  password: {
    type: String,
    required: true, // Pastikan field password di schema sesuai
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
