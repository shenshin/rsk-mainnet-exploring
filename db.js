import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const useSsl =
  // process.env.NODE_ENV === 'production';
  true;

const connectionString =
  process.env.DB_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const dbPool = new pg.Pool({
  connectionString,
  ssl: useSsl,
});

export default dbPool;
