const { Coupon } = require("../database/models");

module.exports = {
    findOne: async (id) => {
        return await Coupon.findByPk(id, {
            include: [
                { association: "coupons" }
            ],
        });
    },
    findAll: async () => {
        return await Coupon.findAll({
            include: [
                { association: "coupons" },
            ],
        });
    },
    create: async (attributes) => {
        return await Coupon.create(attributes);
    },
    destroy: async (id) => {
        return await Coupon.destroy({
            where: { id: id },
        });
    },
    update: async (id, attributes) => {
        return await Coupon.update(attributes, { 
            where: { id: id }, 
        });
    }
};