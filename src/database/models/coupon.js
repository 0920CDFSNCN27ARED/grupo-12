'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coupon.belongsTo(models.Order,{
        as:"orders",
        foreignKey:"couponId"
      });
    }
  };
  Coupon.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    discount: DataTypes.FLOAT(10,2),
    couponCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Coupon',
    tableName: 'Coupons',
  });
  return Coupon;
};