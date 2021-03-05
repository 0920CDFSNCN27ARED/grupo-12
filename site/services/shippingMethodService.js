const { ShippingMethod } = require("../database/models");

module.exports = {
    findOne: async (id) => {
        return await ShippingMethod.findByPk(id, {
            include: [
                { association: "orders" }
            ],
        });
    },
    findAll: async () => {
        return await ShippingMethod.findAll({
            include: [
                { association: "orders" },
            ],
        });
    },
    create: async (attributes) => {
        return await ShippingMethod.create(attributes);
    },
    destroy: async (id) => {
        return await ShippingMethod.destroy({
            where: { id: id },
        });
    },
    update: async (id, attributes) => {
        return await ShippingMethod.update(attributes, { 
            where: { id: id }, 
        });
    }
};