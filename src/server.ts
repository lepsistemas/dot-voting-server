import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';

import Application from './Application';

const app = express();
app.use(express.json());;
app.use(cors({ origin: process.env.CORS_ORIGIN}));

const http = app.listen(process.env.PORT || 5000);
const io = socketio(http);

const application: Application = new Application(app, io);
application.start();