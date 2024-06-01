
import "reflect-metadata";
import { DataSource } from 'typeorm';
import { User } from "../entity/User";
import { IS_PRODUCTION, POSTGRES_CONNECTION, POSTGRES_CONNECTION_TIMEOUT } from './env';

export const AppDataSource = new DataSource({
  type: "postgres",
  url: POSTGRES_CONNECTION,
  synchronize: true,
  logging: !IS_PRODUCTION,
  logger: IS_PRODUCTION ? undefined : 'debug',
  connectTimeoutMS: +POSTGRES_CONNECTION_TIMEOUT,
  logNotifications: !IS_PRODUCTION,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
})