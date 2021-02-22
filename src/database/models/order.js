'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     
     */
     static associate(models) { 
       Order.belongsTo(models.Payment, {
         as: "payments",
         foreignKey:"paymentId"
        });
        Order.belongsTo(models.User, {
          as: "users",
          foreignKey:"userId"
        });
        Order.hasMany(models.CartItem, {
          as: "cartItems",
          foreignKey:"orderId"
        });
        Order.belongsTo(models.ShippingMethod, {
          as: "shippingMethods",
          foreignKey:"shippingMethodId"
        });
        Order.belongsTo(models.Shop, {
          as: "shops",
          foreignKey:"shopId"
        });
        Order.belongsToMany(models.Product, {
          as: "products",
          foreignKey:"orderId",
          through:"CartItem"
        }); 
        Order.hasMany(models.Address, {
          as: "addresses",
          foreignKey: "billAddressId"
        })
        Order.belongsTo(models.Coupon,{
          as:"coupons",
          foreignKey:"couponId"
        })
        }
    };
    Order.init({
      email: DataTypes.STRING,
      totalProducts: DataTypes.STRING,
      totalShipping: DataTypes.INTEGER,
      message: DataTypes.STRING,
      tax: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      userId:DataTypes.INTEGER,
      shopId:DataTypes.INTEGER,
      statusId:DataTypes.INTEGER,
      paymentId:DataTypes.INTEGER,
      couponId:DataTypes.INTEGER,
      shippingMethodId:DataTypes.INTEGER,
      billAddressId:DataTypes.INTEGER,
      shippingAddressId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders'
  });
  return Order;
};
