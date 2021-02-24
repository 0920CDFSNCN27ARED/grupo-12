// Require
const { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");

// Data
const { User, Category, Type, Shop, Product, Payment, Order, CartItem, ShippingMethod} = require("../database/models");

// Services
const userService = require("../services/userService");
const productService = require("../services/productService");
const shopService = require("../services/shopService");
const categoryService = require("../services/categoryService");
const typeService = require("../services/typeService");
const paymentService = require("../services/paymentService");
const orderService = require("../services/orderService");
const cartItemService = require("../services/cartItemService");
const commentService = require("../services/commentService");
const couponService = require("../services/couponService");
const shippingMethodService = require("../services/shippingMethodService");

// Controller
const adminController = {
    
    //GET admin Profile
    getAdminProfile: async (req, res, next) => {
        let errors = validationResult(req);
        const id = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(id);
            let users = await userService.findAll();
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let shops = await shopService.findAll();
            let products = await productService.findAll();
            let payments = await paymentService.findAll();
            let orders = await orderService.findAll();
            let shippingMethods = await shippingMethodService.findAll();
            let comments = await commentService.findAll();
            let coupons = await couponService.findAll();

            if (errors.isEmpty()) {  
                res.render("admin/admin-profile", {
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments: payments,
                    orders: orders,
                    shippingMethods: shippingMethods,
                    comments: comments,
                    coupons: coupons
                });

            } else {
                res.render("admin/admin-profile", {
                    errors: errors.errors,
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments: payments,
                    orders: orders,
                    shippingMethods: shippingMethods,
                    comments: comments,
                    coupons: coupons
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //******************* Users Controllers *******************//

    //GET user profile
    getUserProfile: async (req, res, next) => {
        let errors = validationResult(req);
        const id = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(id);
            let user = await userService.findOne(req.params.id);
            let userData = await userService.getCurrentUserData(user);
            
            if (errors.isEmpty()) {            
                res.render("admin/users/admin-user-profile", {
                    admin: currentUser,
                    user: user,
                    comments: userData.comments,
                    orders: userData.orders
                }); 
            } else {
                res.render("admin/users/admin-user-profile", {
                    errors: errors.errors,
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
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
                let avatar = req.file ? req.file.filename : "default-avatar.png";

                for (let i = 0; i < users.length; i++) {
                    const user = users[i];
                    if(req.body.email == user.email && req.body.userName == user.userName){
                        return res.render("admin/users/admin-create-user-form", {
                            admin: currentUser,
                            user: user,
                            errors:[
                            {msg:"El email y usuario ingresado ya se encuentran en uso"}
                        ]});
                    }else if(req.body.email == user.email){
                        return res.render("admin/users/admin-create-user-form", {
                            admin: currentUser,
                            user: user,
                            errors:[
                            {msg:"El email ingresado ya está en uso"}
                        ]});
                    }else if(req.body.userName == user.userName){
                        return res.render("admin/users/admin-create-user-form", {
                            admin: currentUser,
                            user: user,
                            errors:[
                            {msg:"El nombre de usuario ingresado ya está en uso"}
                        ]});
                    }
                };

                await userService.create({
                    name: req.body.name,
                    userName: req.body.userName,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: avatar,
                    admin: req.body.admin,
                    status: req.body.status,
                    dni: null,
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
            await userService.destroy(req.params.id);
            res.redirect(`/admin`);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //GET edit user form
    getEditUserForm: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let user = await userService.findOne(req.params.id);
        
            if (errors.isEmpty()) {
                res.render("admin/users/admin-edit-user-form", {
                    admin: currentUser,
                    user: user,
                });
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

                // for (let i = 0; i < users.length; i++) {
                //     const user = users[i];
                //     if(req.body.email == user.email && req.body.userName == user.userName){
                //         return res.render("admin/users/admin-edit-user-form", {
                //             admin: currentUser,
                //             user: user,
                //             errors:[
                //             {msg:"El email y usuario ingresado ya se encuentran en uso"}
                //         ]});
                //     }else if(req.body.email == user.email){
                //         return res.render("admin/users/admin-edit-user-form", {
                //             admin: currentUser,
                //             user: user,
                //             errors:[
                //             {msg:"El email ingresado ya está en uso"}
                //         ]});
                //     }else if(req.body.userName == user.userName){
                //         return res.render("admin/users/admin-edit-user-form", {
                //             admin: currentUser,
                //             user: user,
                //             errors:[
                //             {msg:"El nombre de usuario ingresado ya está en uso"}
                //         ]});
                //     }
                // };
                
                let userToEdit = {
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
                };

                await userService.update(req.params.id, userToEdit)
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
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let user = await userService.findOne(req.params.id);

            if (errors.isEmpty()) {
                let change_password = "";
                if (req.body.confirmation == req.body.new_password) {
                    change_password = bcrypt.hashSync(req.body.new_password,10);
                } else {
                    change_password = user.password;
                };
                await userService.update(req.params.id,{
                    password: change_password
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

    //******************* Shops Controllers *******************//

    //GET shop profile
    getShopProfile: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let shop = await shopService.findOne(req.params.id);
            let user = await userService.findOne(req.params.id);
            let products = await productService.findAll();
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let userData = await userService.getCurrentUserData(user);
            
            if (errors.isEmpty()) {
                res.render("admin/shops/shop-profile", {
                    admin: currentUser,
                    shop: shop,
                    user: user,
                    comments: userData.comments,
                    products: products,
                    categories: categories,
                    types: types,
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
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let users = await userService.findAll();
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let shops = await shopService.findAll();
            let products = await productService.findAll();
            let payments = await paymentService.findAll();
            let orders = await orderService.findAll();
            let shippingMethods = await shippingMethodService.findAll();
            let comments = await commentService.findAll();
            let coupons = await couponService.findAll();

            if (errors.isEmpty()) {

                let avatar = req.files.avatar;
                if (req.files.avatar != null) {
                    avatar = req.files.avatar[0].filename;
                } else {
                    avatar = "without-image.png";
                };

                let gallery = [];
                if (req.files.gallery != null) {
                    let array = req.files.gallery;
                    for (let i = 0; i < array.length; i++) {
                        const image = array[i].filename;
                        gallery.push(image);  
                    }
                } else {
                    gallery = ["without-image.png","without-image.png","without-image.png"];
                };
        
                await productService.create({ 
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
                  
            } else {
                res.render("admin/admin-profile", {
                    errors: errors.errors,
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments: payments,
                    orders: orders,
                    shippingMethods: shippingMethods,
                    comments: comments,
                    coupons: coupons
                });
            }
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

    //******************* Comments Controllers *******************//

    //DELETE comment
    destroyComment: async (req, res, next) => {
        try {
            await commentService.destroy(req.params.id);
            res.redirect("/admin#tab-comments");
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //******************* Categories Controllers *******************//

    //POST create category
    postCreateCategory: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let users = await userService.findAll();
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let shops = await shopService.findAll();
            let products = await productService.findAll();
            let payments = await paymentService.findAll();
            let orders = await orderService.findAll();
            let shippingMethods = await shippingMethodService.findAll();
            let comments = await commentService.findAll();
            let coupons = await couponService.findAll();

            if (errors.isEmpty()) {

                await categoryService.create({
                    name: req.body.name,
                    description: req.body.description,
                    typeId: req.body.typeId
                });
                res.redirect("/admin#tab-categories");

            } else {
                res.render("admin/admin-profile", {
                    errors: errors.errors,
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments: payments,
                    orders: orders,
                    shippingMethods: shippingMethods,
                    comments: comments,
                    coupons: coupons
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //PUT edit category
    putEditCategory: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let users = await userService.findAll();
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let shops = await shopService.findAll();
            let products = await productService.findAll();
            let payments = await paymentService.findAll();
            let orders = await orderService.findAll();
            let shippingMethods = await shippingMethodService.findAll();
            let comments = await commentService.findAll();
            let coupons = await couponService.findAll();

            if (errors.isEmpty()) {

                await categoryService.update(req.params.id, {
                    name: req.body.name,
                    description: req.body.description,
                    typeId: req.body.typeId
                },);
                res.redirect("/admin#tab-categories");
                
            } else {
                res.render("admin/admin-profile", {
                    errors: errors.errors,
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments: payments,
                    orders: orders,
                    shippingMethods: shippingMethods,
                    comments: comments,
                    coupons: coupons
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //DELETE category
    destroyCategory: async (req, res, next) => {
        try {
            await categoryService.destroy(req.params.id);
            res.redirect("/admin#tab-categories");
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //******************* Types Controllers *******************//

    //POST create type
    postCreateType: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let users = await userService.findAll();
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let shops = await shopService.findAll();
            let products = await productService.findAll();
            let payments = await paymentService.findAll();
            let orders = await orderService.findAll();
            let shippingMethods = await shippingMethodService.findAll();
            let comments = await commentService.findAll();
            let coupons = await couponService.findAll();

            if (errors.isEmpty()) {
                await typeService.create({
                    name: req.body.name,
                    description: req.body.description,
                });
                res.redirect("/admin#tab-types");
            } else {
                res.render("admin/admin-profile", {
                    errors: errors.errors,
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments: payments,
                    orders: orders,
                    shippingMethods: shippingMethods,
                    comments: comments,
                    coupons: coupons
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //PUT edit type
    putEditType: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let users = await userService.findAll();
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let shops = await shopService.findAll();
            let products = await productService.findAll();
            let payments = await paymentService.findAll();
            let orders = await orderService.findAll();
            let shippingMethods = await shippingMethodService.findAll();
            let comments = await commentService.findAll();
            let coupons = await couponService.findAll();

            if (errors.isEmpty()) {
                await typeService.update(req.params.id, {
                    name: req.body.name,
                    description: req.body.description
                });
                res.redirect("/admin#tab-types");
            } else {
                res.render("admin/admin-profile", {
                    errors: errors.errors,
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments: payments,
                    orders: orders,
                    shippingMethods: shippingMethods,
                    comments: comments,
                    coupons: coupons
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //DELETE type
    destroyType: async (req, res, next) => {
        try {
            await typeService.destroy(req.params.id);
            res.redirect("/admin#tab-types");
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //******************* Coupon Controllers *******************//

    //POST create coupon
    postCreateCoupon: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let users = await userService.findAll();
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let shops = await shopService.findAll();
            let products = await productService.findAll();
            let payments = await paymentService.findAll();
            let orders = await orderService.findAll();
            let shippingMethods = await shippingMethodService.findAll();
            let comments = await commentService.findAll();
            let coupons = await couponService.findAll();

            if (errors.isEmpty()) {
                await couponService.create({
                    name: req.body.name,
                    description: req.body.description,
                    discount: req.body.discount,
                    couponCode: req.body.couponCode,
                    shopId: req.body.typeId
                });
                res.redirect("/admin#tab-coupons");
               
            } else {
                res.render("admin/admin-profile", {
                    errors: errors.errors,
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments: payments,
                    orders: orders,
                    shippingMethods: shippingMethods,
                    comments: comments,
                    coupons: coupons
                });
            }   
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //PUT edit coupon
    putEditCoupon: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try { 
            let currentUser = await userService.findOne(loggedUserId);
            let users = await userService.findAll();
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let shops = await shopService.findAll();
            let products = await productService.findAll();
            let payments = await paymentService.findAll();
            let orders = await orderService.findAll();
            let shippingMethods = await shippingMethodService.findAll();
            let comments = await commentService.findAll();
            let coupons = await couponService.findAll();

            if (errors.isEmpty()) {
                await couponService.update(req.params.id, {
                    name: req.body.name,
                    description: req.body.description,
                    discount: req.body.discount,
                    couponCode: req.body.couponCode,
                    shopId: req.body.typeId
                });
                res.redirect("/admin#tab-coupons");
            
            } else {
                res.render("admin/admin-profile", {
                    errors: errors.errors,
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments: payments,
                    orders: orders,
                    shippingMethods: shippingMethods,
                    comments: comments,
                    coupons: coupons
                });
            }
         } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //DELETE coupon
    destroyCoupon: async (req, res, next) => {
        try {
            await couponService.destroy(req.params.id);
            res.redirect("/admin#tab-coupons");
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //******************* Payments Controllers *******************//

    //POST create payment
    postCreatePayment: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try { 
            let currentUser = await userService.findOne(loggedUserId);
            let users = await userService.findAll();
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let shops = await shopService.findAll();
            let products = await productService.findAll();
            let payments = await paymentService.findAll();
            let orders = await orderService.findAll();
            let shippingMethods = await shippingMethodService.findAll();
            let comments = await commentService.findAll();
            let coupons = await couponService.findAll();

            if (errors.isEmpty()) {
                await paymentService.create({
                    name: req.body.name,
                    description: req.body.description,
                });
                res.redirect("/admin#tab-payments");
            } else {
                res.render("admin/admin-profile", {
                    errors: errors.errors,
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments: payments,
                    orders: orders,
                    shippingMethods: shippingMethods,
                    comments: comments,
                    coupons: coupons
                });
            };
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //PUT edit payment
    putEditPayment: async (req, res, next) => {
        let errors = validationResult(req);
        try { 
            let currentUser = await userService.findOne(loggedUserId);
            let users = await userService.findAll();
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let shops = await shopService.findAll();
            let products = await productService.findAll();
            let payments = await paymentService.findAll();
            let orders = await orderService.findAll();
            let shippingMethods = await shippingMethodService.findAll();
            let comments = await commentService.findAll();
            let coupons = await couponService.findAll();

            if (errors.isEmpty()) {
                await paymentService.update(req.params.id, {
                    name: req.body.name,
                    description: req.body.description
                });
                res.redirect("/admin#tab-payments");
            } else {
                res.render("admin/admin-profile", {
                    errors: errors.errors,
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments: payments,
                    orders: orders,
                    shippingMethods: shippingMethods,
                    comments: comments,
                    coupons: coupons
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    // DELETE Payment
    destroyPayment: async (req, res, next) => {
        try {
            await paymentService.destroy(req.params.id);
            res.redirect("/admin#tab-payments");
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //******************* Shipping Method Controllers *******************//

    //POST create Shipping Method
    postCreateShippingMethod: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try { 
            let currentUser = await userService.findOne(loggedUserId);
            let users = await userService.findAll();
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let shops = await shopService.findAll();
            let products = await productService.findAll();
            let payments = await paymentService.findAll();
            let orders = await orderService.findAll();
            let shippingMethods = await shippingMethodService.findAll();
            let comments = await commentService.findAll();
            let coupons = await couponService.findAll();

            if (errors.isEmpty()) {
                await shippingMethodService.create({
                    name:req.body.name,
                    amount: req.body.amount,
                    description: req.body.description,
                    location: req.body.location 
                });
                res.redirect("/admin#tab-shippingMethods");
            } else {
                res.render("admin/admin-profile", {
                    errors: errors.errors,
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments: payments,
                    orders: orders,
                    shippingMethods: shippingMethods,
                    comments: comments,
                    coupons: coupons
                });
            };
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //PUT Edit Shipping Method
    putEditShippingMethod: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try { 
            let currentUser = await userService.findOne(loggedUserId);
            let users = await userService.findAll();
            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let shops = await shopService.findAll();
            let products = await productService.findAll();
            let payments = await paymentService.findAll();
            let orders = await orderService.findAll();
            let shippingMethods = await shippingMethodService.findAll();
            let comments = await commentService.findAll();
            let coupons = await couponService.findAll();

            if (errors.isEmpty()) {
                await shippingMethodService.update(req.params.id, {
                    name:req.body.name,
                    amount: req.body.amount,
                    description: req.body.description,
                    location: req.body.location 
                });
                res.redirect("/admin#tab-shippingMethods");
            } else {
                res.render("admin/admin-profile", {
                    errors: errors.errors,
                    admin: currentUser,
                    users: users, 
                    categories: categories,
                    types: types,
                    shops: shops,
                    products: products,
                    payments: payments,
                    orders: orders,
                    shippingMethods: shippingMethods,
                    comments: comments,
                    coupons: coupons
                });
            };
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    // DELETE ShippingMethod
    destroyShippingMethod: async (req, res, next) => {
        try {
            await shippingMethodService.destroy(req.params.id);
            res.redirect("/admin#tab-shippingMethods");
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
};

module.exports = adminController;