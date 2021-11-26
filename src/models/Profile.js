import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Profile extends Model {
  static init(sequelize) {
    super.init({
      country: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 20],
            msg: 'Campo país deve ter entre 3 e 20 caracteres',
          },
        },
      },
      state: {
        type: Sequelize.STRING,
        defaultValue: '',

        validate: {
          len: {
            args: [3, 20],
            msg: 'Campo estado deve ter entre 3 e 20 caracteres',
          },
        },
      },
      firstName: {
        type: Sequelize.STRING,
        defaultValue: '',

        validate: {
          len: {
            args: [3, 20],
            msg: 'Campo nome deve ter entre 3 e 20 caracteres',
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo sobrenome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo descrição deve ter entre 3 e 255 caracteres',
          },
        },
      },
      filenamePhoto: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/${process.env.LOCAL_IMAGES_PROFILE}/${this.getDataValue('filenamePhoto')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'profile',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      // onDelete: 'SET NULL',
      // onUpdate: 'CASCADE',
    });
  }
}
