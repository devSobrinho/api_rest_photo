import dotenv from 'dotenv';
import express from 'express';

import home from './routes/home';
import user from './routes/user';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/user', user);
  }
}

export default new App().app;
