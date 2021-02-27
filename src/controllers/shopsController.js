// Require
const { check, validationResult, body } = require("express-validator");

// Services
const shopService = require("../services/shopService");
const userService = require("../services/userService");

// Controller
const shopsController = {
    
    //GET shop profile
    getShop: async (req, res, next) => {
        let loggedUserId = req.session.loggedUserId;
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let shop = await shopService.findOne(currentUser.shopId)
            let shopData = await shopService.getShopData(currentUser);
            res.render("shops/shop-profile", {
                message: message,
                errors: validateErrors,
                products: shopData.products,
                comments: shopData.comments,
                orders: shopData.orders,
                coupons: shopData.coupons,
                shop,
            });
        } catch (error) {
            res.status(400).send(error.message);
        };
    },

    // PUT shop profile data form
    putShopData: async (req, res, next) => {
        let errors = validationResult(req);
        let id = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(id);
            let shop = await shopService.findOne(currentUser.shopId)
            let shopData = await shopService.getShopData(currentUser);

            if (errors.isEmpty()) {
                
                let filename = req.file
                    ? req.file.filename
                    : shop.avatar;
                
                let shopToEdit = { 
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    avatar: filename,
                    bio: req.body.bio,
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    twitter: req.body.twitter
                };

                await shopService.update(shop.id, shopToEdit);
                res.redirect("/shops");

            } else {
                res.render("shops/shop-profile", { 
                    errors: errors.errors,
                    products: shopData.products,
                    comments: shopData.comments,
                    shop, 
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
};

module.exports = shopsController;