//Require
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Configuración mercado pago
const mercadopago = require ('mercadopago');
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
mercadopago.configure({
    access_token: ACCESS_TOKEN
  });

// Services
const orderService = require("../services/orderService");
const productService = require("../services/productService");
const userService = require("../services/userService");
const addressService = require("../services/addressService");
const categoryService = require("../services/categoryService");
const typeService = require("../services/typeService");
const cartItemService = require("../services/cartItemService");
const shippingMethodService = require("../services/shippingMethodService");
const paymentService = require("../services/paymentService");
const couponService = require("../services/couponService");
const { Product } = require("../database/models");

const storeController = {
    getStore: async function (req, res) {
        // Notifications
        const validateErrors = req.flash("validateErrors");
        const message = req.flash("message");
        let notification = null;

        if (validateErrors.length != 0) {
            notification = "error";
        } else if (message.length != 0) {
            notification = "message";
        }

        try {
            let url = req.route.path;
            let page = req.query.page ? req.query.page : 0;
            let products = await Product.findAll({
                include: ["shops", "categories", "types"],
                where: { status: "active" },
                order: [["id", "ASC"]],
                offset: page * 20,
                limit: 20,
            });

            let activeProducts = await Product.findAll({
                where: { status: "active" },
            });
            let totalPages =
                (activeProducts.length - (activeProducts.length % 20)) / 20;

            let categories = await categoryService.findAll();
            let types = await typeService.findAll();

            res.render("store/store", {
                notification: notification,
                message: message,
                errors: validateErrors,
                products,
                categories,
                types,
                totalPages,
                page,
                url,
                selectedType: null,
                selectedCategory: null,
            });
        } catch (error) {
            res.status(404).send(error.message);
        }
    },

    getQuerySearch: async function (req, res) {
        // Notifications
        const validateErrors = req.flash("validateErrors");
        const message = req.flash("message");
        let notification = null;

        if (validateErrors.length != 0) {
            notification = "error";
        } else if (message.length != 0) {
            notification = "message";
        }

        try {
            let url = req.route.path;
            let search = req.query.search;
            let page = req.query.page ? req.query.page : 0;
            let products = await Product.findAll({
                include: ["shops", "categories", "types"],
                where: {
                    status: "active",
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                },
                order: [["name", "ASC"]],
                offset: page * 20,
                limit: 20,
            });

            let activeProducts = await Product.findAll({
                where: {
                    status: "active",
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                },
            });
            let totalPages =
                (activeProducts.length - (activeProducts.length % 20)) / 20;

            let categories = await categoryService.findAll();
            let types = await typeService.findAll();

            res.render("store/store", {
                notification: notification,
                message: message,
                errors: validateErrors,
                products,
                categories,
                types,
                totalPages,
                page,
                url,
                productsSearched: activeProducts.length,
                search,
                selectedType: null,
                selectedCategory: null,
            });
        } catch (error) {
            res.status(404).send(error.message);
        }
    },

    postQuerySearch: async function (req, res) {
        if (req.body.search == "") {
            return res.redirect("/store");
        }
        let searched = req.body.search;
        try {
            let products = await Product.findAll({
                where: {
                    status: "active",
                    name: {
                        [Op.like]: `%${searched}%`,
                    },
                },
            });

            if (products.length == 0) {
                req.flash("validateErrors", [
                    {
                        msg: `No se encontraron productos que contengan "${searched}", por favor intenta con otra búsqueda`,
                    },
                ]);
                return res.redirect("/store/search");
            }

            req.flash("message", "Perfecto, tenemos algunos resultados!");
            return res.redirect(`/store/search?search=${searched}`);
        } catch (error) {
            res.status(404).send(error.message);
        }
    },

    getQueryCategory: async function (req, res) {
        // Notifications
        const validateErrors = req.flash("validateErrors");
        const message = req.flash("message");
        let notification = null;

        if (validateErrors.length != 0) {
            notification = "error";
        } else if (message.length != 0) {
            notification = "message";
        }

        try {
            let page = req.query.page ? req.query.page : 0;
            let url = req.route.path;
            let categoryQuery = req.query.category ? req.query.category : "all";

            let products;
            let activeProducts;
            let selectedCategory;
            if (categoryQuery == "all") {
                products = await Product.findAll({
                    include: ["shops", "categories", "types"],
                    where: { status: "active" },
                    order: [["id", "ASC"]],
                    offset: page * 20,
                    limit: 20,
                });
                activeProducts = await Product.findAll({
                    where: { status: "active" },
                });
                selectedCategory = null;
            } else {
                products = await Product.findAll({
                    include: ["shops", "categories", "types"],
                    where: { status: "active", categoryId: categoryQuery },
                    order: [["id", "ASC"]],
                    offset: page * 20,
                    limit: 20,
                });
                activeProducts = await Product.findAll({
                    where: { status: "active", categoryId: categoryQuery },
                });
                let findCategory = await categoryService.findOne(categoryQuery);
                selectedCategory = {
                    name: findCategory.name,
                    id: findCategory.id,
                };
            }

            let totalPages =
                (activeProducts.length - (activeProducts.length % 20)) / 20;

            let categories = await categoryService.findAll();
            let types = await typeService.findAll();
            let selectedType = null;

            res.render("store/store", {
                notification: notification,
                message: message,
                errors: validateErrors,
                products,
                categories,
                types,
                totalPages,
                page,
                url,
                selectedType,
                selectedCategory,
            });
        } catch (error) {
            res.status(404).send(error.message);
        }
    },

    getQueryType: async function (req, res) {
        // Notifications
        const validateErrors = req.flash("validateErrors");
        const message = req.flash("message");
        let notification = null;

        if (validateErrors.length != 0) {
            notification = "error";
        } else if (message.length != 0) {
            notification = "message";
        }

        try {
            let page = req.query.page ? req.query.page : 0;
            let url = req.route.path;
            let typeQuery = req.query.type ? req.query.type : "all";

            let products;
            let activeProducts;
            let selectedType;
            if (typeQuery == "all") {
                products = await Product.findAll({
                    include: ["shops", "categories", "types"],
                    where: { status: "active" },
                    order: [["id", "ASC"]],
                    offset: page * 20,
                    limit: 20,
                });
                activeProducts = await Product.findAll({
                    where: { status: "active" },
                });
                selectedType = null;
            } else {
                products = await Product.findAll({
                    include: ["shops", "categories", "types"],
                    where: { status: "active", typeId: typeQuery },
                    order: [["id", "ASC"]],
                    offset: page * 20,
                    limit: 20,
                });
                activeProducts = await Product.findAll({
                    where: { status: "active", typeId: typeQuery },
                });
                let findType = await typeService.findOne(typeQuery);
                selectedType = { name: findType.name, id: findType.id };
            }

            let totalPages =
                (activeProducts.length - (activeProducts.length % 20)) / 20;

            let categories = await categoryService.findAll();
            let types = await typeService.findAll();

            res.render("store/store", {
                notification: notification,
                message: message,
                errors: validateErrors,
                products,
                categories,
                types,
                totalPages,
                page,
                url,
                selectedCategory: null,
                selectedType,
            });
        } catch (error) {
            res.status(404).send(error.message);
        }
    },

    getCart: function (req, res) {
        // Notifications
        const validateErrors = req.flash("validateErrors");
        const message = req.flash("message");
        let notification = null;
        if (validateErrors.length != 0) {
            notification = "error";
        } else if (message.length != 0) {
            notification = "message";
        }

        res.render("store/productCart", {
            notification: notification,
            message: message,
            errors: validateErrors,
        });
    },

    getCheckout: async (req, res) => {
        let loggedUserId = req.session.loggedUserId;
        let currentUser;
        try {
            if (loggedUserId == undefined) {
                currentUser = null;
            } else {
                currentUser = await userService.findOne(loggedUserId);
            }
            let shippingMethods = await shippingMethodService.findAll();
            let paymentMethods = await paymentService.findAll();

            // Notifications
            const validateErrors = req.flash("validateErrors");
            const message = req.flash("message");
            let notification = null;
            if (validateErrors.length != 0) {
                notification = "error";
            } else if (message.length != 0) {
                notification = "message";
            }

            res.render("store/checkout", {
                currentUser,
                shippingMethods,
                paymentMethods,
                notification: notification,
                message: message,
                errors: validateErrors,
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    postCheckout: async (req, res) => {
        let errors = validationResult(req);
        let f = new Date();
        let date =
            f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
        let expireDate =
            f.getFullYear() + "-" + (f.getMonth() + 2) + "-" + f.getDate();
        const time = f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds();
        let loggedUserId = req.session.loggedUserId;
        let currentUser;
        try {
            if (loggedUserId == undefined) {
                currentUser = null;
            } else {
                currentUser = await userService.findOne(loggedUserId);
            }

            if (errors.isEmpty()) {
                // Verificamos cupón
                let couponAmount, coupon, couponId;
                if (req.body.couponCode == "") {
                    couponAmount = 0;
                    couponId = null;
                } else {
                    coupon = await couponService.findCode(req.body.couponCode);
                    if (coupon.length != 0 && coupon[0].status == "active") {
                        couponAmount = coupon[0].discount;
                        couponId = coupon[0].id;
                    } else {
                        couponAmount = 0;
                        couponId = null;
                    }
                }
                // Obtenemos valor de envío
                let shippingMethod = await shippingMethodService.findOne(
                    req.body.shippingMethod
                );
                let totalShipping = shippingMethod.amount;

                if (req.body.productsQty == 0) {
                    req.flash("validateErrors", [
                        {
                            msg:
                                "El carrito se encuentra vacio, no es posible realizar un pedido.",
                        },
                    ]);
                    return res.redirect(`/store/checkout`);
                }

                if (currentUser == null) {
                    // Verificamos si el usuario existe
                    let checkEmail = await userService.checkUserEmail(
                        req.body.email
                    );
                    if (checkEmail == "used") {
                        req.flash("validateErrors", [
                            {
                                msg:
                                    "El email ingresado ya pertenece a un usuario registrado.",
                            },
                        ]);
                        return res.redirect("/store/checkout");
                    }

                    // Creamos el usuario
                    let password =
                        req.body.password != ""
                            ? bcrypt.hashSync(req.body.password, 10)
                            : bcrypt.hashSync(req.body.email, 10);

                    let user = await userService.create({
                        name: req.body.name,
                        userName: req.body.email,
                        phone: req.body.phone,
                        email: req.body.email,
                        dni: parseInt(req.body.dni),
                        password: password,
                        avatar: "default-avatar.png",
                        admin: false,
                        status: "active",
                        role: "buyer",
                        bio: "",
                        facebook: "",
                        instagram: "",
                        twitter: "",
                        shopId: null,
                    });

                    // Creamos direccion de facturación
                    let billingAddress = await addressService.create({
                        fullName: req.body.name,
                        address: req.body.billingAddress,
                        city: req.body.billingCity,
                        province: req.body.billingProvince,
                        postalCode: req.body.billingPostalCode,
                        country: req.body.billingCountry,
                        message: req.body.billingMessage,
                        userId: user.id,
                    });

                    // Creamos direccion de envio en caso de estar verificada
                    let shippingAddressId;
                    if (req.body.shippingCheck == 1) {
                        let shippingAddress = await addressService.create({
                            fullName: req.body.name,
                            address: req.body.shippingAddress,
                            city: req.body.shippingCity,
                            province: req.body.shippingProvince,
                            postalCode: req.body.shippingPostalCode,
                            country: req.body.shippingCountry,
                            userId: user.id,
                        });
                        shippingAddressId = shippingAddress.id;
                    } else {
                        shippingAddressId = null;
                    }

                    // creamos pedido general
                    let order = await orderService.create({
                        date: date.toString(),
                        email: req.body.email,
                        totalProducts: null,
                        totalShipping: totalShipping,
                        message: req.body.billingMessage,
                        tax: 0,
                        total: null,
                        userId: user.id,
                        shopId: 1,
                        statusId: 1,
                        paymentId: req.body.paymentMethod,
                        couponId: couponId,
                        shippingMethodId: req.body.shippingMethod,
                        billAddressId: billingAddress.id,
                        shippingAddressId: shippingAddressId,
                    });

                    // Creamos lineas de pedido y las asignamos a la orden
                    let productId,
                        productQty,
                        product,
                        subtotal = 0,
                        productsTotal = 0,
                        discountsTotal = 0,
                        shops = [];
                    for (let i = 1; i <= req.body.productsQty; i++) {
                        productId = eval(`req.body.product${i}`);
                        productQty = eval(`req.body.qty${i}`);
                        product = await productService.findOne(productId);
                        subtotal =
                            (product.price - product.discount) * productQty;

                        await cartItemService.create({
                            subtotal: subtotal,
                            quantity: productQty,
                            price: product.price,
                            discount: product.discount,
                            expireTime: expireDate.toString(),
                            productId: productId,
                            orderId: order.id,
                        });

                        productsTotal =
                            productsTotal + product.price * productQty;
                        discountsTotal =
                            discountsTotal + product.discount * productQty;
                        shops.push(product.shopId);
                    }

                    // Calculamos total de orden
                    let orderTotalProducts = productsTotal - discountsTotal;
                    let orderTotal =
                        productsTotal +
                        totalShipping -
                        discountsTotal -
                        couponAmount;

                    await orderService.update(order.id, {
                        totalProducts: orderTotalProducts,
                        total: orderTotal,
                    });
                    if (req.body.paymentMethod == 4) {
                        let items =[]
                            for (let i = 1; i <= req.body.productsQty; i++) {
                                let productId = eval(`req.body.product${i}`);
                                let productQty = eval(`req.body.qty${i}`);
                                let product = await productService.findOne(productId);
                                subtotal =
                                (product.price - product.discount) * productQty;
                                item ={
                                    title: product.name,
                                    unit_price: Number(product.price),
                                    quantity: Number(productQty)
                                }
                                items.push(item);
                            }
                            const preference = {
                                items: items,
                                back_urls:{
                                    success:`${process.env.DOMAIN}/mercadopago/success/${order.id}`,
                                    pending:`${process.env.DOMAIN}/mercadopago/pending/${order.id}`,
                                    failure:`${process.env.DOMAIN}/mercadopago/failure/${order.id}`
                                },
                                payment_methods:{
                                    excluded_payment_types:[
                                        {
                                            id:"ticket"
                                        },
                                        {
                                            id:"atm"
                                        },
                                        {
                                            id:"prepaid_card"
                                        }
                                    ]
                                }
                            };
                            let result = await mercadopago.preferences.create(preference);
                            return res.redirect(result.body.init_point);
                    }else{
                        req.flash("message", "Tu pedido se realizo correctamente.");
                        return res.redirect(`/orders/${order.id}/orderSuccess`);    
                    }

                } else if (currentUser) {
                    // Creamos direccion de envio en caso de estar verificada
                    let shippingAddressId;
                    if (req.body.shippingCheck == 1) {
                        let shippingAddress = await addressService.create({
                            fullName: currentUser.name,
                            address: req.body.shippingAddress,
                            city: req.body.shippingCity,
                            province: req.body.shippingProvince,
                            postalCode: req.body.shippingPostalCode,
                            country: req.body.shippingCountry,
                            userId: currentUser.id,
                        });
                        shippingAddressId = shippingAddress.id;
                    } else {
                        shippingAddressId = req.body.shippingAddressId;
                    }

                    // creamos pedido general
                    let order = await orderService.create({
                        date: date.toString(),
                        email: currentUser.email,
                        totalProducts: null,
                        totalShipping: totalShipping,
                        message: req.body.billingMessage,
                        tax: 0,
                        total: null,
                        userId: currentUser.id,
                        shopId: 1,
                        statusId: 1,
                        paymentId: req.body.paymentMethod,
                        couponId: couponId,
                        shippingMethodId: req.body.shippingMethod,
                        billAddressId: req.body.billAddressId,
                        shippingAddressId: shippingAddressId,
                    });
                    console.log(currentUser);

                    // Creamos lineas de pedido y las asignamos a la orden
                    let productId,
                        productQty,
                        product,
                        subtotal = 0,
                        productsTotal = 0,
                        discountsTotal = 0,
                        shops = [];
                    for (let i = 1; i <= req.body.productsQty; i++) {
                        productId = eval(`req.body.product${i}`);
                        productQty = eval(`req.body.qty${i}`);
                        product = await productService.findOne(productId);
                        subtotal =
                            (product.price - product.discount) * productQty;

                        await cartItemService.create({
                            subtotal: subtotal,
                            quantity: productQty,
                            price: product.price,
                            discount: product.discount,
                            expireTime: expireDate.toString(),
                            productId: productId,
                            orderId: order.id,
                        });

                        productsTotal =
                            productsTotal + product.price * productQty;
                        discountsTotal =
                            discountsTotal + product.discount * productQty;
                        shops.push(product.shopId);
                    }

                    // Calculamos total de orden
                    let orderTotalProducts = productsTotal - discountsTotal;
                    let orderTotal =
                        productsTotal +
                        totalShipping -
                        discountsTotal -
                        couponAmount;

                    await orderService.update(order.id, {
                        totalProducts: orderTotalProducts,
                        total: orderTotal,
                    });
                    console.log(order);
                    if (req.body.paymentMethod == 4) {
                        let items =[]
                            for (let i = 1; i <= req.body.productsQty; i++) {
                                let productId = eval(`req.body.product${i}`);
                                let productQty = eval(`req.body.qty${i}`);
                                let product = await productService.findOne(productId);
                                subtotal =
                                (product.price - product.discount) * productQty;
                                item ={
                                    title: product.name,
                                    unit_price: Number(product.price),
                                    quantity: Number(productQty)
                                }
                                items.push(item);
                            }
                            const preference = {
                                items: items,
                                back_urls:{
                                    success:`${process.env.DOMAIN}/mercadopago/success/${order.id}`,
                                    pending:`${process.env.DOMAIN}/mercadopago/pending/${order.id}`,
                                    failure:`${process.env.DOMAIN}/mercadopago/failure/${order.id}`
                                },
                                payment_methods:{
                                    excluded_payment_types:[
                                        {
                                            id:"ticket"
                                        },
                                        {
                                            id:"atm"
                                        },
                                        {
                                            id:"prepaid_card"
                                        }
                                    ]
                                }
                            };
                            let result = await mercadopago.preferences.create(preference);
                            return res.redirect(result.body.init_point);
                    }else{
                        req.flash("message", "Tu pedido se realizo correctamente.");
                        return res.redirect(`/orders/${order.id}/orderSuccess`);    
                    }
                }
            } else {
                req.flash("validateErrors", errors.errors);
                return res.redirect("/store/checkout");
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
};

module.exports = storeController;