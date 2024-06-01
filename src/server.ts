import cors from 'cors';
import express, { Application } from 'express';
import routesService from './controllers';

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
        this.app.use(routesService);
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port: ${this.port}`);
        })
    }
}

export default Server;