import { connect } from './config/database';
import { PORT } from './config/env';
import Server from './server';

connect().then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.log('Error connecting to database', err);
});

const server = new Server(PORT);

server.listen();