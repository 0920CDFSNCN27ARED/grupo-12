const { Shop, Comment, Order, Product } = require("../database/models");

module.exports = {
    findOne: async (id) => {
        return await Shop.findByPk(id, {
            include:[
                {association: "products"},
                {association: "users"},
                {association: "orders"},
            ],
        });
    },
    findAll: async () => {
        return await Shop.findAll({
            include:[
                {association: "products"},
                {association: "users"},
                {association: "orders"},
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
    getShopData: async (currentUser) => {

        let allProducts = await Product.findAll({ 
            include:[
                {association: "shops"},
                {association: "categories"},
                {association: "types"}
            ]});
        let products = [];
        allProducts.forEach(product => {
            if (product.shopId == currentUser.shopId) {
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
            if (order.shopId == currentUser.shopId) {
                orders.push(order);
            }
        });

        return (data = { products, comments, orders });
    },
};



