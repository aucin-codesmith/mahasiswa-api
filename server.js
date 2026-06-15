const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

let mahasiswa = [
  { nim: '2021001', nama: 'Muchammad Yusuf', jurusan: 'Teknik Informatika' },
  { nim: '2021002', nama: 'Zaky Auliyaa', jurusan: 'Sistem Informasi' },
  { nim: '2021003', nama: 'Aucin', jurusan: 'DKV' },
];

app.get('/mahasiswa', (req, res) => {
  res.json(mahasiswa);
});

app.get('/mahasiswa/:nim', (req, res) => {
  const { nim } = req.params;
  const found = mahasiswa.find((m) => m.nim === nim);
  if (!found) {
    return res.status(404).json({ pesan: 'Mahasiswa tidak ditemukan' });
  }
  res.json(found);
});

app.post('/mahasiswa', (req, res) => {
  const { nama, nim } = req.body;
  if (!nama || !nim) {
    return res.status(400).json({ pesan: 'Nama dan NIM wajib diisi' });
  }
  res.status(201).json({ pesan: `Berhasil menambahkan mahasiswa baru bernama ${nama}` });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});