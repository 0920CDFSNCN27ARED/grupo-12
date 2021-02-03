const { User, Shop, Comment, Order, Product } = require("../database/models");

module.exports = {
    findOne: async (id) => {
        return await Shop.findByPk(id, {
            include: ["products"],
        });
    },
    findAll: async () => {
        return await Shop.findAll({
            include: ["products"],
        });
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

        let products = await Product.findAll({ where: {shopId: currentUser.shopId} });
        let allComments = await Comment.findAll();
        let comments = [];

        products.forEach(product => {
            allComments.forEach(comment => {
                if (comment.productId == product.id) {
                    comments.push(comment);
                }
            });
        });

        return (data = { products, comments });
    },
};



