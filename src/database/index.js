import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Photos from '../models/Photos';
import Profile from '../models/Profile';

const models = [User, Photos, Profile];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
