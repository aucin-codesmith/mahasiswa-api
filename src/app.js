const express = require('express');
const cors = require('cors');

const mahasiswaRoutes = require('./routes/mahasiswaRoutes');
const authRoutes = require('./routes/authRoutes');
const { notFoundHandler, globalErrorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ pesan: 'Server OK' });
});

app.use('/api/mahasiswa', mahasiswaRoutes);
app.use('/api/auth', authRoutes);

// 404 untuk route yang tidak terdaftar
app.use(notFoundHandler);

// Global error handler, harus di paling akhir
app.use(globalErrorHandler);

module.exports = app;