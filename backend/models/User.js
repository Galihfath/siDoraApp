const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['PMI', 'Pendonor'], default: 'Pendonor', required: true },
  
  // Tambahan data profil
  nik: { type: String },
  jenisKelamin: { type: String }, // "0" untuk Tidak diketahui, "1" untuk Laki-laki, dll.
  agama: { type: String }, // "1" untuk Islam, "2" untuk Kristen, dll.
  tempatLahir: { type: String },
  tanggalLahir: { type: Date },
  alamat: { type: String },
  rt: { type: String },
  rw: { type: String },
  provinsi: { type: String },
  kota: { type: String },
  kecamatan: { type: String },
  kelurahan: { type: String },
  kodePos: { type: String },
  golonganDarah: { type: String }, // "0" untuk Tidak tahu, "1" untuk A, dll.
  pekerjaan: { type: String }, // "0" untuk Tidak Bekerja, "1" untuk PNS, dll.
  beratBadan: { type: Number },
  tinggiBadan: { type: Number },
  noHp: { type: String }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
