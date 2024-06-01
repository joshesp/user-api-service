import { AppDataSource } from './config/connectionDatabase';
import { PORT } from './config/env';
import Server from './server';

AppDataSource.initialize().then(() => {
  console.log('Connected to database');

  const server = new Server(PORT);

  server.listen();
}).catch((err) => {
  console.log('Error connecting to database', err);
});
