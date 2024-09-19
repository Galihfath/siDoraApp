const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Import User Model

const app = express();
const PORT = process.env.PORT || 5000;

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
    console.log("Incoming POST request to /register"); // Log saat request masuk
    console.log("Request body:", req.body); // Log data yang dikirim dari frontend
    
    const { name, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ name, username, email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });
    console.log("User registered successfully"); // Log saat registrasi sukses
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});


// Route untuk login pengguna
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Jalankan server di port 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
