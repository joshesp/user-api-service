import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || '3000';
const IS_PRODUCTION = (process.env.NODE_ENV !== 'development');

const POSTGRES_CONNECTION = process.env.POSTGRES_CONNECTION;
const POSTGRES_CONNECTION_TIMEOUT = process.env.POSTGRES_CONNECTION_TIMEOUT ?? '10000';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

export {
  IS_PRODUCTION, JWT_EXPIRATION, JWT_SECRET, PORT,
  POSTGRES_CONNECTION, POSTGRES_CONNECTION_TIMEOUT
};
