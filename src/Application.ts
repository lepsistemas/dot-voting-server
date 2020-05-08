import express from 'express';
import cors from 'cors';
import Routes from './infrastructure/presentation/Routes';

class Application {

    private app = express();
    private routes: Routes = new Routes();

    public start(port: string | number): void {
        this.app.use(express.json());
        this.app.use(cors({ origin: '*' }));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
        this.app.use(this.routes.create());
        this.app.listen(port);
    }

}

export default Application;