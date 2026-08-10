const { pgTable, serial, varchar, integer } = require('drizzle-orm/pg-core');

const mahasiswa = pgTable('mahasiswa', {
  id: serial('id').primaryKey(),
  nim: varchar('nim', { length: 20 }).notNull().unique(),
  nama: varchar('nama', { length: 100 }).notNull(),
  jurusan: varchar('jurusan', { length: 100 }),
  umur: integer('umur').notNull(),
});

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 100 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
});

module.exports = { mahasiswa, users };