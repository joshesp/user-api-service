
import { DataSource } from 'typeorm';
import { POSTGRES_CONNECTION, POSTGRES_CONNECTION_TIMEOUT, PRODUCTION } from './env';

export const AppDataSource = new DataSource({
  type: "postgres",
  url: POSTGRES_CONNECTION,
  synchronize: true,
  logging: true,
  logger: PRODUCTION ? undefined : 'debug',
  connectTimeoutMS: +POSTGRES_CONNECTION_TIMEOUT,
  logNotifications: PRODUCTION,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
})