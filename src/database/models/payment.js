'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     
     static associate(models) {
       Payment.hasMany(models.Order, {
         as: "orders",
         foreignKey:"paymentId"
        });
      }
    };
  Payment.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'Payments'
  });
  return Payment;
};