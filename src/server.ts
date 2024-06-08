import cors from 'cors';
import express, { Application } from 'express';
import { CONTEXT_API } from './config/constanst';
import errorMiddleware from './middlewares/errorMiddleware';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import Logger from './utils/Logger';

class Server {
    private app: Application;
    private port: string;
    private context = `${CONTEXT_API}/v1`;

    constructor(port: string) {
        this.app = express();
        this.port = port;

        this.configurations();
    }

    private configurations(): void {
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use(`${this.context}/users`, userRoutes);
        this.app.use(`${this.context}/auth`, authRoutes);

        this.app.use(errorMiddleware);
    }

    listen(): void {
        this.app.listen(this.port, () => {
            Logger.info(`Server is running on port: ${this.port}`);
        })
    }
}

export default Server;
