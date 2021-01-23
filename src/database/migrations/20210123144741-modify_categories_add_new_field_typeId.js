'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
        'Categories', // table name
        'typeId', // new field name
        {
          type: Sequelize.INTEGER,
        },
    ) 
  }
};
