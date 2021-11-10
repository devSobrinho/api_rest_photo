import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Photos from '../models/Photos';

const models = [User, Photos];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
