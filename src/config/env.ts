import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || '3000';
const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_CONNECTION = process.env.DB_CONNECTION;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

export {
  DB_CONNECTION, JWT_EXPIRATION, JWT_SECRET, NODE_ENV, PORT
};
