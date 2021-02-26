// Require
const { check, validationResult, body } = require("express-validator");

// Services
const shopService = require("../../services/shopService");
const userService = require("../../services/userService");
const categoryService = require("../../services/categoryService");
const typeService = require("../../services/typeService");


// Data
const { User, Category, Type, Shop, Product} = require("../../database/models");

// Controller
const shopsController = {

    //GET shop profile
    profile: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let shop = await shopService.findOne(req.params.id);
            let shopData = await shopService.getShopData(currentUser);
            let shopOwner = await userService.findOne(shop.users.id);
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            
            if (errors.isEmpty()) {
                res.render("admin/shops/shop-profile", {
                    admin: currentUser,
                    shop: shop,
                    user: shopOwner,                   
                    categories: categories,
                    types: types,
                    products: shopData.products,
                    orders: shopData.orders,
                    coupons: shopData.coupons,
                    comments: shopData.comments,
                });
            } else {
                res.render("admin/shops/shop-profile", {
                    errors: errors.errors,
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //POST create shop
    create: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;

        if (errors.isEmpty()) {
            try {
                let avatar = req.file ? req.file.filename : "default.jpg";

                await Shop.create({ 
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    avatar: avatar,
                    ranking: 0,
                    status: req.body.status,
                    sales: 0,
                    bio: req.body.bio,
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    twitter: req.body.twitter
                });

                await User.update({ 
                    shopId: req.body.userId,
                    role: 'seller'
                },
                {
                    where: { id: req.body.userId}
                });

                res.redirect(`/admin`);
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            let users = await User.findAll({
                include: [{association: "shops"}]
            });
            let categories = await Category.findAll({
                include: [{association: "types"}]
            });
            let types = await Type.findAll({
                include: [{association: "categories"}]
            });
            let shops = await Shop.findAll({
                include: [{association: "users"}]
            });
            let products = await Product.findAll({
                include: [
                    {association: "shops"},
                    {association: "categories"},
                    {association: "types"}
                ]
            });
            res.render("admin/admin-profile", {
                errors: errors.errors,
                admin: current_user,
                users: users, 
                categories: categories,
                types: types,
                shops: shops,
                products: products
            });
        }
    },

    //DELETE type
    destroy: async (req, res, next) => {
        try {
            await shopService.destroy(req.params.id);
            req.flash('message', 'La tienda fue eliminada correctamente.');
            res.redirect("/admin#tab-shops");
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    
}

module.exports = shopsController;