import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || '8080';
const IS_PRODUCTION = (process.env.NODE_ENV !== 'development');

const POSTGRES_CONNECTION = process.env.POSTGRES_CONNECTION;
const POSTGRES_CONNECTION_TIMEOUT = process.env.POSTGRES_CONNECTION_TIMEOUT ?? '10000';

const JWT_SECRET = process.env.JWT_SECRET || 'X5xJ@CS_ycg14*';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '15m';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fePJWwOc-121QItIg';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'he1BrdwwOcQIt3jIgn4Fbw==';

export {
  ENCRYPTION_KEY,
  IS_PRODUCTION,
  JWT_EXPIRATION,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_SECRET,
  PORT,
  POSTGRES_CONNECTION,
  POSTGRES_CONNECTION_TIMEOUT
};

