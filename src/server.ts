import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';

import Application from './Application';

const server = express();
server.use(express.json());;
server.use(cors({ origin: process.env.CORS_ORIGIN}));

const http = server.listen(process.env.PORT || 5000);
const io = socketio(http);

const application: Application = new Application(server, io);
application.start();