const { User, Comment, Order, Shop } = require("../database/models");

module.exports = {
    findOne: async (id) => {
        return await User.findByPk(id, {
            include:[
                {association: "shops"},
                {association: "comments"},
                {association: "orders"},
            ],
        });
    },
    findAll: async () => {
        return await User.findAll({
            include:[
                {association: "shops"},
                {association: "comments"},
                {association: "orders"},
            ],
        });
    },
    create: async (attributes) => {
        return await User.create(
            attributes
        );
    },
    destroy: async (id) => {
        return await User.destroy({
            where: {id: id}
        });
    },
    update: async (id, attributes) => {
        return await User.update(
            attributes,
            { where: {id: id} }
        );
    },
    getCurrentUserData: async (currentUser) => {

        //user comments
        let allComments = await Comment.findAll({
            include: [
                { association: "users" },
                { association: "products" },
            ],
        });
        let comments = [];
        for (const comment of allComments) {
            if(comment.userId == currentUser.id){
                comments.push(comment);
            }
        };

        //user order
        let allOrders = await Order.findAll({
            include: [
                { association: "payments" },
                { association: "users" },
                { association: "cartItems" },
                { association: "shippingMethods" },
                { association: "shops" },
                { association: "products" },
                { association: "billAddresses" },
                { association: "shippingAddresses" },
                { association: "coupons" },
                { association: "status" },
            ],
        });
        let orders = [];
        for (const order of allOrders) {
            if(order.userId == currentUser.id){
                orders.push(order);
            }
        };

        // user Shop
        let shop = await Shop.findByPk(currentUser.id, {
            include:[
                {association: "products"},
                {association: "users"},
                {association: "orders"},
            ],
        });

        //user data
        return (data = { comments, orders, shop });
    },
};



