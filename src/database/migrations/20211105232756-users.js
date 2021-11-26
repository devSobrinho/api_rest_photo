module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('users', {

    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,

    },
    email: {
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false,
    },

  }),

  down: async (queryInterface, Sequelize) => { await queryInterface.dropTable('users'); },
};
