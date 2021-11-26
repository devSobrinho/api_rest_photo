module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('profile', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    country: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,

    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },

    filename_photo: {
      type: Sequelize.STRING,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id',
      },
      // onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },

    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },

  }),
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profile');
  },
};
