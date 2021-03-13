//Require
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// Services
const orderService = require("../services/orderService");
const productService = require("../services/productService");
const userService = require("../services/userService");
const addressService = require("../services/addressService");
const categoryService = require("../services/categoryService");
const cartItemService = require("../services/cartItemService");
const shippingMethodService = require("../services/shippingMethodService");
const paymentService = require("../services/paymentService");
const couponService = require("../services/couponService");

const ordersController = {
    getOrderDetails: async function (req, res) {
        let loggedUserId = req.session.loggedUserId;
        let currentUser;
    
        // Notifications
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        let notification = null;

        if(validateErrors.length != 0){
            notification = 'error'
        } else if(message.length != 0){
            notification = 'message'
        };

        try {
            if (loggedUserId == undefined) {
                currentUser = null;
            } else {
                currentUser = await userService.findOne(loggedUserId);
            }
            let order = await orderService.findOne(req.params.id);
            res.render("orders/orderDetails", {
                notification: notification,
                message: message,
                errors: validateErrors,
                order,
                currentUser,
            });
        } catch (error) {
            res.status(404).send(error.message);
        }
    },
};

module.exports = ordersController;