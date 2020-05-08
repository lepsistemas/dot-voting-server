import express from 'express';
import Routes from './infrastructure/presentation/Routes';

class Application {

    private app = express();
    private routes: Routes = new Routes();

    public start(port: string | number): void {
        this.app.use(express.json());
        this.app.use(this.routes.create());
        this.app.listen(port);
    }

}

export default Application;