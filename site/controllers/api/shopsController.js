// Services
const shopService = require("../../services/shopService");
const { Shop } = require("../../database/models")

// Controller
const shopsController = {
    findAll: async (req, res) => {
        let page = req.query.page ? req.query.page : 0;
        let shops = await Shop.findAll({
            include: ["products", "users", "orders", "shopCoupons"],
            order: [["createdAt", "DESC"]],
            offset: page * 6,
            limit: 6,
        });
        let count = await Shop.count();

        res.json({
            meta: {
                status: 200,
                url: req.originalUrl,
                totalCount: count,
            },
            data: shops,
        });
    },

    shopsCount: async (req, res) => {
        let count = await Shop.count();
        res.json({
            meta: {
                status: 200,
                url: req.originalUrl,
            },
            data: count,
        });
    },

    findOne: async (req, res) => {
        try {
            let shop = await shopService.findOne(req.params.id);
            res.json({
                meta: {
                    status: 200,
                    url: req.originalUrl,
                },
                data: shop,
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
};

module.exports = shopsController;