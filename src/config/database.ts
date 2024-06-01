import pg from 'pg';
import { DB_CONNECTION } from './env';

const { Client } = pg

const client = new Client({
    connectionString: DB_CONNECTION,
});

export const connect = async () => {
  await client.connect();
  return client;
}

export const disconnect = async () => {
  await client.end();
}

export const query = async (query: string, params?: any[]) => {
  return await client.query(query, params);
}