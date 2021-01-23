// Require
const { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");

// Data
const { User, Category, Type, Shop } = require("../database/models");
const getCurrentUserData = require("../utils/getCurrentUserData");

// Controller
const adminController = {
    
    //GET admin Profile
    getAdminProfile: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        
        if (errors.isEmpty()) {
            try {
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
                res.render("admin/admin-profile", {
                    admin: current_user,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops
                });
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.render("admin/admin-profile", {
                errors: errors.errors,
            });
        }
    },

    //******************* Users Controllers *******************//

    //GET edit user form
    getEditUserForm: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        
        if (errors.isEmpty()) {
            try {
                let user = await User.findByPk(req.params.id);
                
                res.render("admin/users/admin-edit-user-form", {
                    admin: current_user,
                    user: user,
                });
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.render("admin/users/admin-edit-user-form", {
                errors: errors.errors,
            });
        }
    },

    //GET user profile
    getUserProfile: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        
        if (errors.isEmpty()) {
            try {
                let user = await User.findByPk(req.params.id);
                
                // Temporal
                let userData = getCurrentUserData(user);
                let userComments = userData.userComments;
                
                res.render("admin/users/admin-user-profile", {
                    admin: current_user,
                    user: user,
                    comments: userComments
                });
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.render("admin/users/admin-user-profile", {
                errors: errors.errors,
            });
        }
    },

    //GET create user form
    getCreateUserForm: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        
        if (errors.isEmpty()) {
            try {
                res.render("admin/users/admin-create-user-form", {
                    admin: current_user,
                });
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.render("admin/users/admin-create-user-form", {
                errors: errors.errors,
            });
        }
    },

    //POST create user form
    postCreateUserForm: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;

        if (errors.isEmpty()) {
            try {
                let avatar = req.file ? req.file.filename : "default-avatar.png";
                
                let password = "";
                if (req.body.confirmation == req.body.new_password) {
                    password = bcrypt.hashSync(req.body.new_password,10);
                } else {
                    password = current_user.password;
                }
                await User.create({
                    name: req.body.name,
                    userName: req.body.userName,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: password,
                    avatar: avatar,
                    admin: req.body.admin,
                    status: req.body.status,
                    shopId: null,
                    role:"buyer",
                    bio: req.body.bio || "Escribe algo sobre tí",
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    twitter: req.body.twitter
                });

                res.redirect(`/admin`);
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.render("admin/users/admin-create-user-form", {
                errors: errors.errors,
                admin: current_user,
            });
        }
    },

    //DELETE user
    destroyUser: async (req, res, next) => {
        try {
            await User.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.redirect(`/admin`);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //PUT edit data user form
    putEditDataUserForm: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        let user = await User.findByPk(req.params.id);

        if (errors.isEmpty()) {
            try {
                let avatar = req.file ? req.file.filename : user.avatar;

                if(user.role == "seller"){
                    user.role = req.body.role;
                };

                if(req.body.role == "buyer" || user.role == "buyer"){
                    user.shopId = null;
                }
                
                await User.update({
                    name: req.body.name,
                    userName: req.body.userName,
                    phone: req.body.phone,
                    email: req.body.email,
                    avatar: avatar,
                    admin: req.body.admin,
                    status: req.body.status,
                    shopId: user.shopId,
                    role: user.role,
                    bio: req.body.bio || "Escribe algo sobre tí",
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    twitter: req.body.twitter
                },
                {
                    where: {
                        id: req.params.id
                    }
                });

                res.redirect(`/admin/${req.params.id}/user-profile`);
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.render("admin/users/admin-edit-user-form", {
                errors: errors.errors,
                admin: current_user,
                user: user
            });
        }
    },

    //PUT edit pass user form
    putEditPassUserForm: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        let user = await User.findByPk(req.params.id);

        if (errors.isEmpty()) {
            try {
                let change_password = "";
                if (req.body.confirmation == req.body.new_password) {
                    change_password = bcrypt.hashSync(req.body.new_password,10);
                } else {
                    change_password = user.password;
                };
                
                await User.update({
                    password: change_password
                },
                {
                    where: {
                        id: req.params.id
                    }
                });

                res.redirect(`/admin/${req.params.id}/user-profile`);
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.render("admin/users/admin-edit-user-form", {
                errors: errors.errors,
                admin: current_user,
                user: user
            });
        }
    },

    //******************* Products Controllers *******************//

    //POST create category
    postCreateCategory: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;

        if (errors.isEmpty()) {
            try {
                await Category.create({
                    name: req.body.name,
                    description: req.body.description,
                    typeId: req.body.typeId
                });
                res.redirect(`/admin`);
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            let users = await User.findAll();
            let categories = await Category.findAll({
                include: [{association: "types"}]
            });
            let types = await Type.findAll();
            res.render("admin/admin-profile", {
                errors: errors.errors,
                admin: current_user,
                users: users, 
                categories: categories,
                types: types
            });
        }
    },

    //PUT edit category
    putEditCategory: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;

        if (errors.isEmpty()) {
            try {
                await Category.update({
                    name: req.body.name,
                    description: req.body.description,
                    typeId: req.body.typeId
                }, {
                    where: { id: req.params.id }
                });
                res.redirect(`/admin`);
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            let users = await User.findAll();
            let categories = await Category.findAll({
                include: [{association: "types"}]
            });
            let types = await Type.findAll();
            res.render("admin/admin-profile", {
                errors: errors.errors,
                admin: current_user,
                users: users, 
                categories: categories,
                types: types
            });
        }
    },

    //DELETE category
    destroyCategory: async (req, res, next) => {
        try {
            await Category.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.redirect(`/admin`);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //POST create type
    postCreateType: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;

        if (errors.isEmpty()) {
            try {
                await Type.create({
                    name: req.body.name,
                    description: req.body.description,
                });
                res.redirect(`/admin`);
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            let users = await User.findAll();
            let categories = await Category.findAll({
                include: [{association: "types"}]
            });
            let types = await Type.findAll();
            res.render("admin/admin-profile", {
                errors: errors.errors,
                admin: current_user,
                users: users, 
                categories: categories,
                types: types
            });
        }
    },

    //PUT edit type
    putEditType: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;

        if (errors.isEmpty()) {
            try {
                await Type.update({
                    name: req.body.name,
                    description: req.body.description
                }, {
                    where: { id: req.params.id }
                });
                res.redirect(`/admin`);
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            let users = await User.findAll();
            let categories = await Category.findAll({
                include: [{association: "types"}]
            });
            let types = await Type.findAll();
            res.render("admin/admin-profile", {
                errors: errors.errors,
                admin: current_user,
                users: users, 
                categories: categories,
                types: types
            });
        }
    },

    //DELETE type
    destroyType: async (req, res, next) => {
        try {
            await Type.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.redirect(`/admin`);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //******************* Shops Controllers *******************//

    //GET shop profile
    getShopProfile: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        
        if (errors.isEmpty()) {
            try {
                let shop = await Shop.findByPk(req.params.id);
                let user = await User.findByPk(req.params.id);

                // Temporal
                let userData = getCurrentUserData(user);
                let userComments = userData.userComments;
                
                res.render("admin/shops/shop-profile", {
                    admin: current_user,
                    shop: shop,
                    user: user,
                    comments: userComments
                });
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.render("admin/shops/shop-profile", {
                errors: errors.errors,
            });
        }
    },

    //POST create shop
    postCreateShop: async (req, res, next) => {
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
            let users = await User.findAll();
            let categories = await Category.findAll({
                include: [{association: "types"}]
            });
            let types = await Type.findAll();
            let shops = await Shop.findAll();
            res.render("admin/admin-profile", {
                errors: errors.errors,
                admin: current_user,
                users: users, 
                categories: categories,
                types: types,
                shops: shops
            });
        }
    },

};

module.exports = adminController;