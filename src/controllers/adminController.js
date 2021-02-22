// Require
const { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");

// Data
const { User, Category, Type, Shop, Product, Payment, Order, CartItem, ShippingMethod} = require("../database/models");
const getCurrentUserData = require("../utils/getCurrentUserData");

// Services
const userService = require("../services/userService");

// Controller
const adminController = {
    
    //GET admin Profile
    getAdminProfile: async (req, res, next) => {
        let errors = validationResult(req);
        const id = req.session.loggedUserId;
        
        if (errors.isEmpty()) {
            try {
                let currentUser = await userService.findOne(id);

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
                    include: [
                        {association: "users"},
                        {association: "products"},
                ]
                });
                let products = await Product.findAll({
                    include: [
                        {association: "shops"},
                        {association: "categories"},
                        {association: "types"}
                    ]
                });
                let payments = await Payment.findAll({
                    include:[
                        {association: "orders"},
                    ]
                });
                let orders = await Order.findAll({
                    include:[
                        {association: "payments"},
                        {association: "users"},
                        {association: "cartItems"},
                        {association: "shippingMethods"},
                    ]
                });
                let cartItems = await CartItem.findAll({
                    include:[
                        {association: "orders"},
                    ]
                });
                let shippingMethods = await ShippingMethod.findAll({
                    include:[
                        {association: "orders"},
                    ]
                });
                res.render("admin/admin-profile", {
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments:payments,
                    orders:orders,
                    cartItems:cartItems,
                    shippingMethods:shippingMethods
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
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            if (errors.isEmpty()) {
                res.render("admin/users/admin-create-user-form", {
                    admin: currentUser,
                });
            } else {
                res.render("admin/users/admin-create-user-form", {
                    admin: currentUser,
                    errors: errors.errors,
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //POST create user form
    postCreateUserForm: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let users = await userService.findAll();
            
            if (errors.isEmpty()) {

                for (let i = 0; i < users.length; i++) {
                    const user = users[i];
                    if(req.body.email == user.email && req.body.userName == user.userName){
                        return res.render("admin/users/admin-create-user-form", {
                            admin: currentUser,
                            errors:[
                            {msg:"El email y usuario ingresado ya se encuentran en uso"}
                        ]});
                    }else if(req.body.email == user.email){
                        return res.render("admin/users/admin-create-user-form", {
                            admin: currentUser,
                            errors:[
                            {msg:"El email ingresado ya está en uso"}
                        ]});
                    }else if(req.body.userName == user.userName){
                        return res.render("admin/users/admin-create-user-form", {
                            admin: currentUser,
                            errors:[
                            {msg:"El nombre de usuario ingresado ya está en uso"}
                        ]});
                    }
                };

                let avatar = req.file ? req.file.filename : "default-avatar.png";
                
                await User.create({
                    name: req.body.name,
                    userName: req.body.userName,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: req.body.password,
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
                
            } else {
                res.render("admin/users/admin-create-user-form", {
                    errors: errors.errors,
                    admin: currentUser,
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
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

    //GET edit user form
    getEditUserForm: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        let currentUser = await userService.findOne(loggedUserId);
        let user = await userService.findOne(req.params.id);
        
        if (errors.isEmpty()) {
            try {
                res.render("admin/users/admin-edit-user-form", {
                    admin: currentUser,
                    user: user,
                });
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.render("admin/users/admin-edit-user-form", {
                errors: errors.errors,
                admin: currentUser,
                user: user
            });
        }
    },

    //PUT edit data user form
    putEditDataUserForm: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let user = await userService.findOne(req.params.id);
            let users = await userService.findAll();

            if (errors.isEmpty()) {
                
                let avatar = req.file ? req.file.filename : user.avatar;

                if(user.role == "seller"){
                    user.role = req.body.role;
                };

                if(req.body.role == "buyer" || user.role == "buyer"){
                    user.shopId = null;
                }

                for (let i = 0; i < users.length; i++) {
                    const user = users[i];
                    if(req.body.email == user.email && req.body.userName == user.userName){
                        return res.render("admin/users/admin-edit-user-form", {
                            admin: currentUser,
                            user: user,
                            errors:[
                            {msg:"El email y usuario ingresado ya se encuentran en uso"}
                        ]});
                    }else if(req.body.email == user.email){
                        return res.render("admin/users/admin-edit-user-form", {
                            admin: currentUser,
                            user: user,
                            errors:[
                            {msg:"El email ingresado ya está en uso"}
                        ]});
                    }else if(req.body.userName == user.userName){
                        return res.render("admin/users/admin-edit-user-form", {
                            admin: currentUser,
                            user: user,
                            errors:[
                            {msg:"El nombre de usuario ingresado ya está en uso"}
                        ]});
                    }
                };
                
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
                { where: { id: req.params.id }
                });

                res.redirect(`/admin/${req.params.id}/user-profile`);
                
            } else {
                res.render("admin/users/admin-edit-user-form", {
                    errors: errors.errors,
                    admin: currentUser,
                    user: user
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
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

    //******************* Categories Controllers *******************//

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

    //******************* Types Controllers *******************//

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
        console.log(req.url);
        if (errors.isEmpty()) {
            try {
                let shop = await Shop.findByPk(req.params.id);
                let user = await User.findByPk(req.params.id);
                let products = await Product.findAll({
                    where: {
                        shopId: req.params.id
                    },
                    include: [
                        {association: "shops"},
                        {association: "categories"},
                        {association: "types"}
                    ]
                });
                let categories = await Category.findAll({
                    include: [{association: "types"}]
                });
                let types = await Type.findAll({
                    include: [{association: "categories"}]
                });

                // Temporal
                let userData = getCurrentUserData(user);
                let userComments = userData.userComments;
                
                res.render("admin/shops/shop-profile", {
                    admin: current_user,
                    shop: shop,
                    user: user,
                    comments: userComments,
                    products: products,
                    categories: categories,
                    types: types,
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

    //******************* Products Controllers *******************//

    //POST create product
    postCreateProduct: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;

        let avatar = req.files.avatar;
        if (req.files.avatar != null) {
            avatar = req.files.avatar[0].filename;
        } else {
            avatar = "without-image.png";
        }

        let gallery = [];
        if (req.files.gallery != null) {
            let array = req.files.gallery;
            for (let i = 0; i < array.length; i++) {
                const image = array[i].filename;
                gallery.push(image);  
            }
        } else {
            gallery = ["without-image.png","without-image.png","without-image.png"];
        }

        if (errors.isEmpty()) {
            try {
                await Product.create({ 
                    shopId: req.body.shopId,
                    name: req.body.name,
                    description: req.body.description,
                    details: req.body.details,
                    brewery: req.body.brewery,
                    price: parseFloat(req.body.price),
                    discount: parseFloat(req.body.discount),
                    stock: req.body.stock || 0,
                    categoryId: req.body.categoryId,
                    typeId: req.body.typeId,
                    ibu: req.body.ibu,
                    abv: req.body.abv,
                    og: req.body.og,
                    avatar: avatar,
                    gallery01: gallery[0] ? gallery[0] : "without-image.png",
                    gallery02: gallery[1] ? gallery[1] : "without-image.png",
                    gallery03: gallery[2] ? gallery[2] : "without-image.png",
                });

                if(req.url == `/${req.body.shopId}/shop-profile`){
                    return res.redirect(`/admin/${req.body.shopId}/shop-profile`);
                }else {
                    return res.redirect(`/admin`);
                }
                
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
    //******************* Payments Controllers *******************//

    //POST create payment
    postCreatePayment: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;

        if (errors.isEmpty()) {
            try {
                await Payment.create({
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
    putEditPayment: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;

        if (errors.isEmpty()) {
            try {
                await Payment.update({
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
    // DELETE Payment
    destroyPayment: async (req, res, next) => {
        try {
            await Payment.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.redirect(`/admin`);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
        //******************* Order Controllers *******************//

    //POST create order
    postCreateOrder: async (req, res, next) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            try{
                await Order.create({
                    email: req.body.email,
                    count:req.body.count,
                    totalShipping: req.body.totalShipping,
                    tax:req.body.tax,
                    total:req.body.total,
                    status:req.body.status,
                    userId:req.body.userId,
                    paymentId:req.body.paymentId,
                    shippingMethodId:req.body.shippingMethodId
                })
            console.log(req.body)
            res.redirect("/admin")
            }catch(error){
                res.status(400).send(error.message);
                console.log(error)
            }
        }else{
            let id= req.session.loggedUserId;
            let currentUser = await userService.findOne(id);
            let users = await User.findAll();
            let categories = await Category.findAll({
                include: [{association: "types"}]
            });
            let types = await Type.findAll();
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
            let payments = await Payment.findAll({
                include:[
                    {association: "orders"},
                ]
            });
            let orders = await Order.findAll({
                include:[
                    {association: "payments"},
                    {association: "users"},
                    {association: "cartItems"},
                    {association: "shippingMethods"},
                ]
            });
            let cartItems = await CartItem.findAll({
                include:[
                    {association: "orders"},
                ]
            });
            let shippingMethods = await ShippingMethod.findAll({
                include:[
                    {association: "orders"},
                ]
            });
            res.render("admin/admin-profile", {
                errors: errors.errors,
                admin: currentUser,
                users: users, 
                categories: categories,
                types: types,
                shops: shops,
                products: products,
                payments:payments,
                orders:orders,
                cartItems:cartItems,
                shippingMethods:shippingMethods
            }); 
        }
    },

    //PUT Edit Order
    putEditOrder: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;

        if (errors.isEmpty()) {
            try {
                await Order.update({
                    email: req.body.email,
                    count:req.body.count,
                    totalShipping: req.body.totalShipping,
                    tax:req.body.tax,
                    total:req.body.total,
                    userId:req.body.userId,
                    paymentId:req.body.paymentId,
                    shippingMethodId:req.body.shippingMethodId
                }, {
                    where: { id: req.params.id }
                });
                res.redirect(`/admin`);
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            let id= req.session.loggedUserId;
            let currentUser = await userService.findOne(id);
            let users = await User.findAll();
            let categories = await Category.findAll({
                include: [{association: "types"}]
            });
            let types = await Type.findAll();
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
            let payments = await Payment.findAll({
                include:[
                    {association: "orders"},
                ]
            });
            let orders = await Order.findAll({
                include:[
                    {association: "payments"},
                    {association: "users"},
                    {association: "cartItems"},
                    {association: "shippingMethods"},
                ]
            });
            let cartItems = await CartItem.findAll({
                include:[
                    {association: "orders"},
                ]
            });
            let shippingMethods = await ShippingMethod.findAll({
                include:[
                    {association: "orders"},
                ]
            });
            res.render("admin/admin-profile", {
                errors: errors.errors,
                admin: currentUser,
                users: users, 
                categories: categories,
                types: types,
                shops: shops,
                products: products,
                payments:payments,
                orders:orders,
                cartItems:cartItems,
                shippingMethods:shippingMethods
            }); 
        }
    },
    // DELETE Order
    destroyOrder: async (req, res, next) => {
        try {
            await Order.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.redirect(`/admin`);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    //POST create Shipping Method
    postCreateShippingMethod: async (req, res, next) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            try{
                await ShippingMethod.create({
                    name:req.body.name,
                    amount: req.body.amount,
                    description: req.body.description,
                    location: req.body.location 
            })
            res.redirect("/admin")
            }catch(error){
                res.status(400).send(error.message);
                console.log(error)
            }
        }else{
            let id= req.session.loggedUserId;
            let currentUser = await userService.findOne(id);
            let users = await User.findAll();
            let categories = await Category.findAll({
                include: [{association: "types"}]
            });
            let types = await Type.findAll();
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
            let payments = await Payment.findAll({
                include:[
                    {association: "orders"},
                ]
            });
            let orders = await Order.findAll({
                include:[
                    {association: "payments"},
                    {association: "users"},
                    {association: "cartItems"},
                    {association: "shippingMethods"},
                ]
            });
            let cartItems = await CartItem.findAll({
                include:[
                    {association: "orders"},
                ]
            });
            let shippingMethods = await ShippingMethod.findAll({
                include:[
                    {association: "orders"},
                ]
            });
            res.render("admin/admin-profile", {
                errors: errors.errors,
                admin: currentUser,
                users: users, 
                categories: categories,
                types: types,
                shops: shops,
                products: products,
                payments:payments,
                orders:orders,
                cartItems:cartItems,
                shippingMethods:shippingMethods
            }); 
        }
    },

    //PUT Edit Shipping Method

    putEditShippingMethod: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;

        if (errors.isEmpty()) {
            try {
                await Order.update({
                    name:req.body.name,
                    amount: req.body.amount,
                    description: req.body.description,
                    location: req.body.location
                }, {
                    where: { id: req.params.id }
                });
                res.redirect(`/admin`);
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            let id= req.session.loggedUserId;
            let currentUser = await userService.findOne(id);
            let users = await User.findAll();
            let categories = await Category.findAll({
                include: [{association: "types"}]
            });
            let types = await Type.findAll();
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
            let payments = await Payment.findAll({
                include:[
                    {association: "orders"},
                ]
            });
            let orders = await Order.findAll({
                include:[
                    {association: "payments"},
                    {association: "users"},
                    {association: "cartItems"},
                    {association: "shippingMethods"},
                ]
            });
            let cartItems = await CartItem.findAll({
                include:[
                    {association: "orders"},
                ]
            });
            let shippingMethods = await ShippingMethod.findAll({
                include:[
                    {association: "orders"},
                ]
            });
            res.render("admin/admin-profile", {
                errors: errors.errors,
                admin: currentUser,
                users: users, 
                categories: categories,
                types: types,
                shops: shops,
                products: products,
                payments:payments,
                orders:orders,
                cartItems:cartItems,
                shippingMethods:shippingMethods
            }); 
        }
    },
    // DELETE ShippingMethod
    destroyShippingMethod: async (req, res, next) => {
        try {
            await ShippingMethod.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.redirect(`/admin`);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
};

module.exports = adminController;