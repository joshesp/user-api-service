import cors from 'cors';
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';
import errorMiddleware from './middlewares/errorMiddleware';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import Logger from './utils/Logger';

class Server {
    private app: Application;
    private port: string;

    constructor(port: string) {
        this.app = express();
        this.port = port;

        this.configurations();
    }

    private configurations(): void {
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use(`/users`, userRoutes);
        this.app.use(`/auth`, authRoutes);
        this.app.use(
            `/api-docs`,
            swaggerUi.serve,
            swaggerUi.setup(swaggerSpec)
        );
        this.app.get(`/api-docs.json`, (_, res) => {
            res.setHeader('Content-Type', 'application/json')
            res.send(swaggerSpec)
        });
        this.app.use(errorMiddleware);
    }

    listen(): void {
        this.app.listen(this.port, () => {
            Logger.info(`Server is running on port: ${this.port}`);
        })
    }
}

export default Server;
