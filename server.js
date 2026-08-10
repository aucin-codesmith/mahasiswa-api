require('dotenv').config();

const express = require('express');

const mahasiswaRoutes = require('./src/routes/mahasiswaRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ pesan: 'Server OK' });
});

app.use('/api/mahasiswa', mahasiswaRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});