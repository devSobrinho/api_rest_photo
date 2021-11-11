import dotenv from 'dotenv';

import './database';

import express from 'express';

import home from './routes/home';
import user from './routes/user';
import token from './routes/token';
import photo from './routes/photo';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/user/', user);
    this.app.use('/token/', token);
    this.app.use('/photo/', photo);
  }
}

export default new App().app;
