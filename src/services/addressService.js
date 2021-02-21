const {Address } = require("../database/models");

module.exports = {
    findOne: async (id) => {
        return await Address.findByPk(id, {
            include: [
                { association: "orders" },
                { association: "users" }
            ],
        });
    },
    findAll: async () => {
        return await Address.findAll({
            include: [
                { association: "orders" },
                { association: "users" }
            ],
        });
    },
    create: async (attributes) => {
        return await Address.create(attributes);
    },
    destroy: async (id) => {
        return await Address.destroy({
            where: { id: id },
        });
    },
    update: async (id, attributes) => {
        return await Address.update(attributes, { where: { id: id } });
    }
};