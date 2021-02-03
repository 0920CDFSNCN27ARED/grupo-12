const { User, Shop, Comment, Order } = require("../database/models");

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
        let shop = await Shop.findAll({ where: { id: currentUser.shopId } });
        let comments = await Comment.findAll({ where: { userId: currentUser.id } });
        let orders = await Order.findAll({ where: { userId: currentUser.id } });
        return (data = { comments, orders, shop });
    },
};



