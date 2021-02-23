const { Payment } = require("../database/models");

module.exports = {
    findOne: async (id) => {
        return await Payment.findByPk(id, {
            include: [
                { association: "orders" }
            ],
        });
    },
    findAll: async () => {
        return await Payment.findAll({
            include: [
                { association: "orders" },
            ],
        });
    },
    create: async (attributes) => {
        return await Payment.create(attributes);
    },
    destroy: async (id) => {
        return await Payment.destroy({
            where: { id: id },
        });
    },
    update: async (id, attributes) => {
        return await Payment.update(attributes, { 
            where: { id: id }, 
        });
    }
};