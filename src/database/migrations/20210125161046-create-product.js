'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.STRING
      },
      brewery: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      discount: {
        type: Sequelize.FLOAT
      },
      stock: {
        type: Sequelize.INTEGER
      },
      ibu: {
        type: Sequelize.FLOAT
      },
      og: {
        type: Sequelize.FLOAT
      },
      abv: {
        type: Sequelize.FLOAT
      },
      avatar: {
        type: Sequelize.STRING
      },
      gallery01: {
        type: Sequelize.STRING
      },
      gallery02: {
        type: Sequelize.STRING
      },
      gallery02: {
        type: Sequelize.STRING
      },
      shopId: {
        type: Sequelize.INTEGER
      },
      typeId: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};