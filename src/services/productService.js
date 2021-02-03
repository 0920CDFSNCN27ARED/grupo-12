const { Category, Type, Product, Comment } = require("../database/models");

module.exports = {
    findOne: async (id) => {
        return await Product.findByPk(id, {
            include:[
                {association: "shops"},
                {association: "categories"},
                {association: "types"}
            ],
        });
    },
    findAll: async () => {
        return await Product.findAll({
            include:[
                {association: "shops"},
                {association: "categories"},
                {association: "types"}
            ],
        });
    },
    allCategories: async () => {
        return await Category.findAll({
            include:[
                {association: "types"},
            ],
        });
    },
    allTypes: async () => {
        return await Type.findAll({
            include:[
                {association: "categories"},
            ],
        });
    },
    productComments: async (id) => {
        return await Comment.findAll(
            { where: {productId: id} },
            { include:[
                    {association: "products"},
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
};



