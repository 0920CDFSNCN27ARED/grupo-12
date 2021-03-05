// Require
const { check, validationResult, body } = require("express-validator");

// Services
const shopService = require("../services/shopService");
const userService = require("../services/userService");

// Controller
const shopsController = {
    
    //GET shop profile
    getShop: async (req, res, next) => {

        // Notifications
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        let notification = null;
        if(validateErrors.length != 0){
            notification = 'error'
        } else if(message.length != 0){
            notification = 'message'
        };

        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let shop = await shopService.findOne(req.params.id);
            let shopData = await shopService.getShopData(shop);
            res.render("shops/shop-profile", {
                notification: notification,
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

    //POST create shop
    postShopCreate: async (req, res, next) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const loggedUserId = req.session.loggedUserId;
            try {
                let avatar = req.file ? req.file.filename : "default.jpg";

                // Crear tienda
                let shop = await shopService.create({ 
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    avatar: avatar,
                    ranking: 0,
                    status: 'active',
                    sales: 0,
                    bio: req.body.bio,
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    twitter: req.body.twitter
                });

                // Actualizar propietario
                await userService.update(loggedUserId, { 
                    shopId: shop.id,
                    role: 'seller'
                });

                req.flash('message', 'Tu tienda fue creada correctamente, ya puedes empezar a vender tu productos.');
                res.redirect(`/shops/${shop.id}/profile#tab-info`);
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            req.flash('validateErrors', errors.errors);
            res.redirect(`/users/${req.params.id}/profile`);
        }
    },

};

module.exports = shopsController;