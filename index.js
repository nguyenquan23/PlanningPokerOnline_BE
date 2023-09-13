import cors from 'cors';
import express from 'express';
import http from 'http';
import session from 'cookie-session';
import cookieParser from 'cookie-parser';
import route from './app/routes/index';
import { DBConnect } from './app/services/db';
import {
  CLIENT_URL,
  PORT,
  SESSION_NAME,
  SESSION_SECRET,
  HOSTED_CLIENT_URL,
} from './config';
import { attachIO } from './app/socket/socket';

const app = express();

app.use(
  cors({
    origin: [CLIENT_URL, HOSTED_CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

app.use(
  session({
    name: SESSION_NAME,
    keys: [SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(
  express.json({
    limit: '5mb',
  })
);

app.use(cookieParser());

route(app);

const server = http.Server(app);
attachIO(server);

DBConnect().then(() => {
  server.listen(PORT);
  console.log(`Started on ${PORT}`);
});
