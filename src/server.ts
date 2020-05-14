/*
import Application from './Application';
import Routes from './infrastructure/presentation/Routes';
import WebSocket from './WebSocket';

const app: Application = new Application(process.env.PORT || 5000);

const server = app.start();

const webSocket: WebSocket = new WebSocket(server);

const routes: Routes = new Routes(webSocket);
app.setRoutes(routes.create());
*/
import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';
import Routes from './infrastructure/presentation/Routes';

const app = express();
app.use(express.json());;
app.use(cors({ origin: process.env.CORS_ORIGIN}));

const http = app.listen(process.env.PORT || 5000);
const io = socketio(http);

const routes: Routes = new Routes(app, io);
routes.start();