import cors from 'cors';
import express, { Application } from 'express';
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { CONTEXT_API } from './config/constanst';
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

        this.app.use(morgan("tiny"));
        this.app.use(express.static("public"));

        this.app.use(`${CONTEXT_API}/users`, userRoutes);
        this.app.use(`${CONTEXT_API}/auth`, authRoutes);
        this.app.use(
            "/docs",
            swaggerUi.serve,
            swaggerUi.setup(undefined, {
                swaggerOptions: {
                    url: "/swagger.json",
                },
            })
        );
        this.app.use(errorMiddleware);
    }

    listen(): void {
        this.app.listen(this.port, () => {
            Logger.info(`Server is running on port: ${this.port}`);
        })
    }
}

export default Server;
