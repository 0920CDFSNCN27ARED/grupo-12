// Require
const fs = require('fs');
const { check, validationResult, body } = require("express-validator");
let beerResource = require("../../requests/beerResource");

// Services
const productService = require("../../services/productService");
const { Product } = require("../../database/models")
const userService = require("../../services/userService");
const { send } = require('process');

// Controller
const productsController = {

    list: async (req, res) => {
            let page = req.query.page ? req.query.page : 0;
            let count = await Product.count()
            let products = await Product.findAll({
                order: [['createdAt', "DESC"]],
                offset: page *2,
                limit: 2
            });

        res.json({
            meta: {
                status: 200,
                url: req.originalUrl,  
                totalCount: count
            },
            data: products
        });
    },
}

module.exports = productsController;