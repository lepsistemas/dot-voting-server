/*import express, { Router } from 'express';
import cors from 'cors';
import Routes from './infrastructure/presentation/Routes';
import WebSocket from './WebSocket';

class Application {

    private app = express();
    private port: string | number;

    constructor(port: string | number) {
        this.port = port;
        const origin = process.env.CORS_ORIGIN;
        this.app.use(cors({ origin: origin}));
        this.app.use(express.json());
    }


    public start(): any {
        return this.app.listen(this.port);
    }

    public setRoutes(router: Router): void {
        this.app.use(router);
    }

}

export default Application;*/