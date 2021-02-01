'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      totalProducts: {
        type: Sequelize.STRING
      },
      totalShipping: {
        type: Sequelize.INTEGER
      },
      discountCoupon: {
        type: Sequelize.STRING
      },
      tax: {
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      cartItemsId: {
        type: Sequelize.INTEGER
      },
      paymentId: {
        type: Sequelize.INTEGER
      },
      couponId: {
        type: Sequelize.INTEGER
      },
      shippingMethodId: {
        type: Sequelize.INTEGER
      },
      billAddressId: {
        type: Sequelize.INTEGER
      },
      shippingAddressId: {
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
    await queryInterface.dropTable('Orders');
  }
};