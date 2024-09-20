const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['PMI', 'Pendonor'], default: 'Pendonor', required: true },  // Default role is 'Pendonor'
  // field lainnya...
});

module.exports = mongoose.model('User', userSchema);