// Require
const { check, validationResult, body } = require("express-validator");

// Services
const shopService = require("../services/shopService");
const userService = require("../services/userService");

// Controller
const shopsController = {
    
    //GET shop profile
    getShop: async (req, res, next) => {
        let errors = validationResult(req);
        let id = req.session.loggedUserId;
        try {
            if (errors.isEmpty()) {

                let currentUser = await userService.findOne(id);
                let shop = await shopService.findOne(currentUser.shopId)
                let shopData = await shopService.getShopData(currentUser);
                console.log(shopData.products);
                res.render("shops/shop-profile", {
                    products: shopData.products,
                    comments: shopData.comments,
                    orders: shopData.orders,
                    shop,
                });

            } else {
                res.render("shops/shop-profile", {
                    errors: errors.errors,
                });
            };
        } catch (error) {
            res.status(400).send(error.message);
        };
    },

    // PUT shop profile data form
    putShopData: async (req, res, next) => {
        try {
            let errors = validationResult(req);
            let id = req.session.loggedUserId;
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