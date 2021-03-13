//Require
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { createLocalStorage } = require("localstorage-ponyfill");
const localStorage = createLocalStorage();

// Services
const orderService = require("../services/orderService");
const productService = require("../services/productService");
const userService = require("../services/userService");
const addressService = require("../services/addressService");
const categoryService = require("../services/categoryService");
const cartItemService = require("../services/cartItemService");
const shippingMethodService = require("../services/shippingMethodService");
const paymentService = require("../services/paymentService");
const couponService = require("../services/couponService");

const storeController = {
    getStore: async function (req, res) {
        // Notifications
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        let notification = null;

        if(validateErrors.length != 0){
            notification = 'error'
        } else if(message.length != 0){
            notification = 'message'
        };

        try {
            let products = await productService.findAll();
            let categories = await categoryService.findAll();
            res.render("store/store", {
                notification: notification,
                message: message,
                errors: validateErrors,
                products,
                categories,
            });
        } catch (error) {
            res.status(404).send(error.message);
        }
    },

    getCart: function (req, res) {  
        // Notifications
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        let notification = null;
        if(validateErrors.length != 0){
            notification = 'error'
        } else if(message.length != 0){
            notification = 'message'
        };

        res.render("store/productCart",{ 
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
        let loggedUserId = req.session.loggedUserId;
        const hoy = new Date();
        const fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + (hoy.getDate());
        const expireDate = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + (hoy.getDate() + 15);
        const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        try{
            if (errors.isEmpty()) {
                if( loggedUserId == undefined){
                    console.log(req.body);

                    // Verificamos cupón
                    let couponAmount, coupon, couponId;
                    if(req.body.couponCode == ''){
                        couponAmount = 0;
                        couponId = null;
                    } else {
                        coupon = await couponService.findCode(req.body.couponCode);
                        if(coupon.length != 0 && coupon.status == 'active'){
                            couponAmount = coupon.discount;
                            couponId = coupon.id
                        };
                    };

                    // Verificamos si el usuario existe
                    let checkEmail = await userService.checkUserEmail(req.body.email);
                    if(checkEmail == 'used'){
                        req.flash('validateErrors', [{msg: 'El email ingresado ya pertenece a un usuario registrado.'}]);
                        return res.redirect("/store/checkout");
                    };
                    
                    // Obtenemos valor de envío
                    let shippingMethod = await shippingMethodService.findOne(req.body.shippingMethod);
                    let totalShipping = shippingMethod.amount;
                    
                    if(req.body.productsQty > 0){
                        // creamos pedido general
                        let order = await orderService.create({
                            date: fecha,
                            email: req.body.email,
                            totalProducts: req.body.productsQty,
                            totalShipping: totalShipping,
                            message: req.body.billingMessage,
                            tax: 0,
                            total: null,
                            userId: null,
                            shopId: 1,
                            statusId: 1,
                            paymentId: req.body.paymentMethod,
                            couponId: couponId,
                            shippingMethodId: req.body.shippingMethod,
                            billAddressId: null,
                            shippingAddressId: null,
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
                                expireTime: `${expireDate} ${hora}`,
                                productId: productId,
                                orderId: order.id,
                            });

                            productsTotal = productsTotal + product.price * productQty;
                            discountsTotal = discountsTotal + product.discount * productQty
                            shops.push(product.shopId);
                        };

                        // Calculamos total de orden 
                        let orderTotal = productsTotal - discountsTotal - couponAmount;
                        
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
                            shippingAddressId = shippingAddress.id
                        } else {
                            shippingAddressId = null;
                        };

                        // Actualizamos Orden
                        await orderService.update(order.id, {
                            total: orderTotal,
                            userId: user.id,
                            billAddressId: billingAddress.id,
                            shippingAddressId: shippingAddressId,
                        });

                        req.flash("message", "Tu pedido se realizo correctamente.");
                        return res.redirect(`/orders/${order.id}/orderDetails`);

                    } else {
                        req.flash('validateErrors', [{msg: 'El carrito se encuentra vacio, no es posible realizar un pedido.'}]);
                        return res.redirect(`/store/checkout`);
                    };
                    
                } else {
                    let currentUser = userService.findOne(loggedUserId);
                    
                    
                    req.flash("message", "Tu pedido se realizo correctamente.");
                    return res.redirect(
                        `/users/${currentUser.id}/profile#tab-orders`
                    );
                }
            } else {
                req.flash('validateErrors', errors.errors);
                return res.redirect("/store/checkout");
            }
        }catch(error){
            res.status(400).send(error.message);
        }
    },
};

module.exports = storeController;