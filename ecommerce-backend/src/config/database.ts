// src/config/database.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});+

pool.on('connect', () => {
  console.log('Successfully connected to the PostgreSQL database.');
});

// Log the error but DO NOT exit the process
pool.on('error', (err) => {
  console.error('Database pool error:', err);
});

export default pool;