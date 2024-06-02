import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || '3000';
const IS_PRODUCTION = (process.env.NODE_ENV !== 'development');

const POSTGRES_CONNECTION = process.env.POSTGRES_CONNECTION;
const POSTGRES_CONNECTION_TIMEOUT = process.env.POSTGRES_CONNECTION_TIMEOUT ?? '10000';

const JWT_SECRET = process.env.JWT_SECRET || 'e76529f6f11d2243a1e18db3d6c2487e72d4e3c3fcf4a2efaaf24d3615ca4fbb';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '15m';

export {
  IS_PRODUCTION, JWT_EXPIRATION, JWT_SECRET, PORT,
  POSTGRES_CONNECTION, POSTGRES_CONNECTION_TIMEOUT
};
