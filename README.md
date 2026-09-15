# Mahasiswa API

API untuk manajemen data mahasiswa dengan autentikasi JWT, dibangun dengan Express, PostgreSQL, dan Drizzle ORM.

## Cara Menjalankan Aplikasi

### Prasyarat
- Docker Desktop sudah terinstall dan berjalan

### Langkah-langkah

1. Copy `.env.example` menjadi `.env`:
   Isi `JWT_SECRET` dengan string bebas (untuk `DATABASE_URL`, nilai di `docker-compose.yml` akan otomatis dipakai saat run lewat Docker).

2. Jalankan aplikasi dan database:

3. Di terminal baru (biarkan container tetap jalan), jalankan migrasi database (hanya perlu sekali di awal / saat database baru):

4. Aplikasi bisa diakses di `http://localhost:8080`

## Pengujian API

Import file `postman/mahasiswa-api.postman_collection.json` ke Postman untuk mencoba seluruh endpoint.

Urutan pengujian yang disarankan:
1. **Register** — `POST /api/auth/register` — daftar user baru
2. **Login** — `POST /api/auth/login` — dapatkan JWT token, copy nilainya
3. **Create Mahasiswa** — `POST /api/mahasiswa` — tambah data (isi header Authorization dengan `Bearer <token>`)
4. **Get All Mahasiswa** — `GET /api/mahasiswa` — lihat semua data
5. **Update Mahasiswa** — `PUT /api/mahasiswa/:nim` — edit data (butuh token)
6. **Delete Mahasiswa** — `DELETE /api/mahasiswa/:nim` — hapus data (butuh token)

## Daftar Endpoint

| Method | Endpoint | Autentikasi | Keterangan |
|---|---|---|---|
| POST | /api/auth/register | Tidak | Registrasi user baru |
| POST | /api/auth/login | Tidak | Login, mengembalikan JWT token |
| GET | /api/mahasiswa | Tidak | Lihat semua data mahasiswa |
| GET | /api/mahasiswa/:nim | Tidak | Lihat 1 data mahasiswa berdasarkan NIM |
| POST | /api/mahasiswa | Ya (Bearer Token) | Tambah data mahasiswa baru |
| PUT | /api/mahasiswa/:nim | Ya (Bearer Token) | Edit data mahasiswa |
| DELETE | /api/mahasiswa/:nim | Ya (Bearer Token) | Hapus data mahasiswa |

## Validasi

**POST /api/mahasiswa**
- Nama wajib diisi, minimal 3 karakter
- NIM wajib diisi, harus string angka
- Umur wajib diisi, berupa angka, tidak boleh kurang dari 15

**POST /api/auth/register**
- Nama wajib diisi, minimal 3 karakter
- Email wajib diisi, format valid
- Password wajib diisi, minimal 6 karakter

## Tech Stack
- Express.js
- PostgreSQL 16
- Drizzle ORM
- bcrypt (hash password)
- jsonwebtoken (JWT)
- Docker & Docker Compose