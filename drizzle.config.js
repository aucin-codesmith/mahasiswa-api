require('dotenv').config();
const { defineConfig } = require('drizzle-kit');

const config = {
  schema: './db/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};

console.log('CONFIG YANG DIBACA:', config);
module.exports = defineConfig({
  schema: './db/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});