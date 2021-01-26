'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shop.hasOne(models.User, {
        as: "users",
        foreignKey: "shopId"
      });
      Shop.hasMany(models.Product, {
        as: "products",
        foreignKey: "shopId"
      });
    }
  };
  Shop.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    ranking: DataTypes.INTEGER,
    status: DataTypes.STRING,
    sales: DataTypes.INTEGER,
    bio: DataTypes.STRING,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    twiter: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shop',
    tableName: 'Shops'
  });
  return Shop;
};