import Application from './Application';

const app: Application = new Application();

app.start(process.env.PORT || 5000);