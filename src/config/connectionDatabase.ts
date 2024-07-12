
import "reflect-metadata";
import { DataSource } from 'typeorm';
import { PasswordReset } from "../entity/PasswordReset";
import { User } from "../entity/User";
import {
  APP_DATABASE_TIMEOUT,
  APP_DATABASE_URL,
  IS_PRODUCTION
} from './env';

export const AppDataSource = new DataSource({
  type: "postgres",
  url: APP_DATABASE_URL,
  synchronize: false,
  logging: !IS_PRODUCTION,
  logger: IS_PRODUCTION ? undefined : 'debug',
  connectTimeoutMS: +APP_DATABASE_TIMEOUT,
  logNotifications: !IS_PRODUCTION,
  entities: [User, PasswordReset],
  migrations: [],
});
