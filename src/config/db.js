require('dotenv').config();
const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const isLocalDb = connectionString.includes('@db:') || connectionString.includes('localhost');

const pool = new Pool({
  connectionString,
  ssl: isLocalDb ? false : { rejectUnauthorized: false },
});

const db = drizzle(pool);

module.exports = { db, pool };