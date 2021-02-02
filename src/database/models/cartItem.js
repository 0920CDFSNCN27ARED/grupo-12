'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartItem.belongsTo(models.Order,{
        as:'orders',
        foreignKey:"orderId"
      });
      CartItem.belongsTo(models.Product,{
        as:'products',
        foreignKey:"productId"
      });
    }
  };
  CartItem.init({
    subtotal: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    expireTime: DataTypes.DATE,
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'CartItems',
  });
  return CartItem;
};