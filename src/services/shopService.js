const { Shop, Comment, Order, Product, Coupon, sequelize } = require("../database/models");
const { queryTypes } = require("sequelize")

module.exports = {
    findOne: async (id) => {
        return await Shop.findByPk(id, {
            include:[
                {association: "products"},
                {association: "users"},
                {association: "orders"},
                {association: "shopCoupons"},
            ],
        });
    },
    findAll: async () => {
        return await Shop.findAll({
            include:[
                {association: "products"},
                {association: "users"},
                {association: "orders"},
                {association: "shopCoupons"},
            ],
        });
    },
    create: async (attributes) => {
        return await Shop.create(
            attributes
        );
    },
    destroy: async (id) => {
        return await Shop.destroy({
            where: {id: id}
        });
    },
    update: async (id, attributes) => {
        return await Shop.update(
            attributes,
            { where: {id: id} }
        );
    },
    getShopData: async (shop) => {

        let products = await Product.findAll({
            include:[ "shops", "categories", "types"],
            where: {
                shopId: shop.id,
            },
        });

        let comments = await Comment.findAll({
            include:[ "users", "products"],
            where: {
                "$products.id$": shop.id,
            },
        });

        let orders = await Order.findAll({ 
            include:["users", "shops", "payments", "cartItems", "products", 
                     "billAddresses", "shippingAddresses", "shippingMethods", "coupons", "status"],
            where: {
                shopId: shop.id,
            },
        });
        
        let coupons = await Coupon.findAll({
            include: ["coupons", "shopCoupons"],
            where: {
                shopId: shop.id,
            },
        });

        return (data = { products, comments, orders, coupons });
    },
};



