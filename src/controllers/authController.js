const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { eq } = require('drizzle-orm');
const { db } = require('../config/db');
const { users } = require('../models/schema');

const SALT_ROUNDS = 10;

async function register(req, res) {
  try {
    const { nama, email, password } = req.body;
    const errors = [];

    if (!nama || typeof nama !== 'string' || nama.trim().length < 3) {
      errors.push('Nama tidak boleh kosong dan minimal berisi 3 karakter');
    }
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.push('Email tidak boleh kosong dan harus berformat email valid');
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      errors.push('Password tidak boleh kosong dan minimal 6 karakter');
    }

    if (errors.length > 0) {
      return res.status(400).json({ pesan: 'Validasi gagal', errors });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const [created] = await db
      .insert(users)
      .values({ nama: nama.trim(), email: email.trim().toLowerCase(), password: hashedPassword })
      .returning({ id: users.id, nama: users.nama, email: users.email });

    res.status(201).json({ pesan: 'Registrasi berhasil', data: created });
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(409).json({ pesan: 'Email sudah terdaftar' });
    }
    res.status(500).json({ pesan: 'Terjadi kesalahan pada server' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ pesan: 'Email dan password wajib diisi' });
    }

    const [user] = await db.select().from(users).where(eq(users.email, email.trim().toLowerCase()));

    if (!user) {
      return res.status(401).json({ pesan: 'Email atau password salah' });
    }

    const cocok = await bcrypt.compare(password, user.password);
    if (!cocok) {
      return res.status(401).json({ pesan: 'Email atau password salah' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ pesan: 'Login berhasil', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ pesan: 'Terjadi kesalahan pada server' });
  }
}

module.exports = { register, login };