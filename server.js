require('dotenv').config();
const express = require('express');
const { eq } = require('drizzle-orm');
const { db } = require('./db');
const { mahasiswa } = require('./db/schema');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/mahasiswa', async (req, res) => {
  try {
    const data = await db.select().from(mahasiswa);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ pesan: 'Terjadi kesalahan pada server' });
  }
});

app.get('/mahasiswa/:nim', async (req, res) => {
  try {
    const { nim } = req.params;
    const [found] = await db.select().from(mahasiswa).where(eq(mahasiswa.nim, nim));
    if (!found) {
      return res.status(404).json({ pesan: 'Mahasiswa tidak ditemukan' });
    }
    res.json(found);
  } catch (err) {
    console.error(err);
    res.status(500).json({ pesan: 'Terjadi kesalahan pada server' });
  }
});

app.post('/mahasiswa', async (req, res) => {
  try {
    const { nama, nim, jurusan, umur } = req.body;
    const errors = [];

    if (!nama || typeof nama !== 'string' || nama.trim().length < 3) {
      errors.push('Nama tidak boleh kosong dan minimal berisi 3 karakter');
    }
    if (!nim || typeof nim !== 'string' || !/^\d+$/.test(nim)) {
      errors.push('NIM harus diisi dan wajib berupa string angka');
    }
    if (umur === undefined || umur === null || isNaN(Number(umur)) || Number(umur) < 15) {
      errors.push('Umur harus diisi, berupa angka, dan tidak boleh kurang dari 15 tahun');
    }

    if (errors.length > 0) {
      return res.status(400).json({ pesan: 'Validasi gagal', errors });
    }

    const [created] = await db
      .insert(mahasiswa)
      .values({ nama: nama.trim(), nim, jurusan, umur: Number(umur) })
      .returning();

    res.status(201).json({ pesan: `Berhasil menambahkan mahasiswa baru bernama ${created.nama}`, data: created });
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(409).json({ pesan: 'NIM sudah terdaftar' });
    }
    res.status(500).json({ pesan: 'Terjadi kesalahan pada server' });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});