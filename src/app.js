import dotenv from 'dotenv';

import './database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import home from './routes/home';
import user from './routes/user';
import token from './routes/token';
import profile from './routes/profile';

dotenv.config();

const whiteList = [
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/user/', user);
    this.app.use('/token/', token);
    this.app.use('/profile/', profile);
  }
}

export default new App().app;
