const { Category, Type, Product, Comment } = require("../database/models");

module.exports = {
    findOne: async (id) => {
        return await Product.findByPk(id, {
            include:[
                {association: "shops"},
                {association: "categories"},
                {association: "types"},
                {association: "orders"},
                {association: "cartItems"},
                {association: "comments"},
            ],
        });
    },
    findAll: async () => {
        return await Product.findAll({
            include:[
                {association: "shops"},
                {association: "categories"},
                {association: "types"},
                {association: "orders"},
                {association: "cartItems"},
                {association: "comments"},
            ],
        });
    },
    create: async (attributes) => {
        return await Product.create(
            attributes
        );
    },
    destroy: async (id) => {
        return await Product.destroy({
            where: {id: id}
        });
    },
    update: async (id, attributes) => {
        return await Product.update(
            attributes,
            { where: {id: id} }
        );
    },
    findOneComment: async (id) => {
        return await Comment.findByPk(id, {
            include:[
                {association: "users"},
                {association: "products"}
            ],
        });
    },
};



