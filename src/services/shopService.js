const { Shop, Comment, Order, Product, Coupon } = require("../database/models");

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

        let allProducts = await Product.findAll({ 
            include:[
                {association: "shops"},
                {association: "categories"},
                {association: "types"}
            ]});
        let products = [];
        allProducts.forEach(product => {
            if (product.shopId == shop.id) {
                products.push(product);
            }
        });
            
        let allComments = await Comment.findAll({ 
            include:[
                {association: "users"},
                {association: "products"}
            ]});
        let comments = [];
        products.forEach(product => {
            allComments.forEach(comment => {
                if (comment.productId == product.id) {
                    comments.push(comment);
                }
            });
        });

        let allOrders = await Order.findAll({ 
            include:[
                {association: "users"},
                {association: "shops"},
                {association: "payments"},
                {association: "billAddresses"},
                {association: "shippingAddresses"},
                {association: "coupons"},
                {association: "status"}
            ]});
        let orders = [];
        allOrders.forEach(order => {
            if (order.shopId == shop.id) {
                orders.push(order);
            }
        });

        let allCoupons = await Coupon.findAll({
            include: [
                { association: "coupons" },
                {association: "shopCoupons"},
            ],
        });
        let coupons = [];
        allCoupons.forEach(coupon => {
            if (coupon.shopId == shop.id) {
                coupons.push(coupon);
            }
        });

        return (data = { products, comments, orders, coupons });
    },
};



