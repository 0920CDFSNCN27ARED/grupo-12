const { User, Shop, Comment, Order } = require("../database/models");

module.exports = {
    findOne: async (id) => {
        return await User.findByPk(id, {
            include: ["shops"],
        });
    },
    findAll: async () => {
        return await User.findAll({
            include: ["shops"],
        });
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
        try {
            let comments = await Comment.findAll({ where: { userId: currentUser.id } });
            let orders = await Order.findAll({ where: { userId: currentUser.id } });

            return (data = { comments, orders });

        } catch (error) {
            res.status(400).send(error.message);
        }
    },
};



