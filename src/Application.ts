import express from 'express';
import cors from 'cors';
import Routes from './infrastructure/presentation/Routes';

class Application {

    private app = express();
    private routes: Routes = new Routes();

    public start(port: string | number): void {
        const origin = process.env.CORS_ORIGIN;
        this.app.use(cors({ origin: origin}));
        this.app.use(express.json());
        this.app.use(this.routes.create());
        this.app.listen(port);
    }

}

export default Application;