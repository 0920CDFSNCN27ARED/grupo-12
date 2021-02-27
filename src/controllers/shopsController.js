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
            let shop = await shopService.findOne(req.params.id);
            let shopData = await shopService.getShopData(shop);
            res.render("shops/shop-profile", {
                message: message,
                errors: validateErrors,
                currentUser: currentUser,
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
        try {
            let shop = await shopService.findOne(req.params.id);
            if (errors.isEmpty()) {

                let filename = req.file
                    ? req.file.filename
                    : shop.avatar;
                
                await shopService.update(shop.id, { 
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    avatar: filename,
                    bio: req.body.bio,
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    twitter: req.body.twitter
                });

                req.flash('message', 'La tienda fue actualizada correctamente.');
                res.redirect(`/shops/${shop.id}/profile#tab-info`);

            } else {
                req.flash('validateErrors', errors.errors);
                return res.redirect(`/shops/${shop.id}/profile#tab-data`);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
};

module.exports = shopsController;