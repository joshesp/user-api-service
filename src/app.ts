import { AppDataSource } from './config/connectionDatabase';
import { PORT } from './config/env';
import Server from './server';
import Logger from './utils/Logger';

AppDataSource.initialize().then(() => {
  Logger.info('Connected to database');
  const server = new Server(PORT);

  server.listen();
}).catch((err) => {
  Logger.error('Error connecting to database', err);
});
