// Require
const { check, validationResult, body } = require("express-validator");

// Utils
const getData = require("../utils/getData");
const saveData = require("../utils/saveData");
const updateData = require("../utils/updateData");
const deleteData = require("../utils/deleteData");
const getShopData = require("../utils/getShopData");

// Data
const products = getData("../data/productsDB.json");
const comments = getData("../data/commentsDB.json");
const shops = getData("../data/shopsDB.json");

// Controller
const shopsController = {
    
    //GET shop profile
    getShop: function (req, res, next) {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        let shop = shops.find(shop =>{
            return shop.id == current_user.shopId;
        });
        let shopData = getShopData(shop, current_user);

        if (errors.isEmpty()) {

            res.render("shops/shop-profile", {
                products: shopData.shopProducts,
                comments: shopData.shopComments,
                shop,
            });

        } else {
            res.render("shops/shop-profile", {
                errors: errors.errors,
            });
        }
    },

    // PUT shop profile data form
    putShopData: function (req, res, next) {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        let shop = shops.find(shop => {
            return shop.id == current_user.shopId;
        });
        let shopData = getShopData(shop, current_user);
        
        if (errors.isEmpty()) {

            let findIndex = shops.findIndex((shop) => {
                return shop.id == current_user.shopId;
            });
            let filename = req.file
                ? req.file.filename
                : shops[findIndex].avatar;
            
            let shopToEdit = {
                id: parseInt(shop.id),
                userId: current_user.id,  
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                avatar: filename,
                ranking: shop.ranking,
                status: shop.status,
                sales: shop.sales,
                bio: req.body.bio,
                facebook: req.body.facebook,
                instagram: req.body.instagram,
                twitter: req.body.twitter
            };

            // Actualizamos datos del user
            shops.splice(findIndex, 1, shopToEdit);

            updateData(shops, "../data/shopsDB.json");
            res.redirect("/shops");

        } else {
            res.render("shops/shop-profile", { 
                errors: errors.errors,
                products: shopData.shopProducts,
                comments: shopData.shopComments,
                shop, 
            });
        }
    },
};

module.exports = shopsController;