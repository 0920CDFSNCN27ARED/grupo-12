const { Type } = require("../database/models");

module.exports = {
    findOne: async (id) => {
        return await Type.findByPk(id, {
            include: [
                { association: "categories" },
                { association: "products" }
            ],
        });
    },
    findAll: async () => {
        return await Type.findAll({
            include: [
                { association: "categories" },
                { association: "products" }
            ],
        });
    },
    create: async (attributes) => {
        return await Type.create(attributes);
    },
    destroy: async (id) => {
        return await Type.destroy({
            where: { id: id },
        });
    },
    update: async (id, attributes) => {
        return await Type.update(attributes, { 
            where: { id: id }, 
        });
    }
};