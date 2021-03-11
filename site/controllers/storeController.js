//Require
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { createLocalStorage } = require("localstorage-ponyfill");
const localStorage = createLocalStorage({ mode: "memory" }); 

// Services
const orderService = require("../services/orderService");
const productService = require("../services/productService");
const userService = require("../services/userService");
const addressService = require("../services/addressService");
const categoryService = require("../services/categoryService");
const typeService = require("../services/typeService");

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
            res.render("store/store",{ 
                notification: notification,
                message: message,
                errors: validateErrors,
                products, 
                categories 
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

    getCheckout: function (req, res) {
        
        // Notifications
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        let notification = null;
        localStorage.setItem('pepe', 234);
        let total = localStorage.getItem("total");
        console.log(total);

        if(validateErrors.length != 0){
            notification = 'error'
        } else if(message.length != 0){
            notification = 'message'
        };

        res.render("store/checkout",{ 
                total,
                notification: notification,
                message: message,
                errors: validateErrors, 
            });
    },

    postCheckout: async (req, res) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try{
            if (errors.isEmpty()) {
                
                let userId = currentUser != undefined ? loggedUserId : null;
                let addreses = await addressService.findAll();
                let id = addresses.length != 0 ? addreses[addresses.length -1].id +1 : 1; 
                
                await addressService.create({
                    fullName: req.body.name,
                    address: req.body.billingAddress,
                    city: req.body.billingCity,
                    province: req.body.billingProvince,
                    postalCode: req.body.billingPostalCode,
                    country: req.body.billingCountry,
                    message: req.body.billingMessage,
                    userId: userId,
                });
                
                if(req.body.shippingAddress){
                    await addressService.create({
                        fullName: req.body.name,
                        address: req.body.shippingAddress,
                        city: req.body.shippingCity,
                        province: req.body.shippingProvince,
                        postalCode: req.body.shippingPostalCode,
                        country: req.body.shippingCountry,
                        userId: userId,
                    })
                };  

                if(req.body.save-data && currentUser){
                    await userService.update(userId,{
                        dni: req.body.dni,
                        addressId: id
                    })
                };

                if(req.body.password && !currentUser){
                    await userService.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10),
                        addressId: id,
                        phone: req.body.phone,
                        avatar: "default-avatar.png",
                        admin: false,
                        status: "active",
                        shopId: null,
                        role:"buyer",
                        bio: "",
                        facebook: "",
                        instagram: "",
                        twitter: ""
                    })
                }
                let shippingAddressId = req.body.shippingAddress ? id +1 : null
                await orderService.create({
                    email: req.body.email,
                    totalProducts: 3,
                    totalShipping: 350,
                    message:req.body.orderMessage,
                    tax: 6876,
                    total: 1250,
                    userId:userId,
                    shopId:1,
                    statusId: 1,
                    paymentId: req.body.payment,
                    couponId:2,
                    shippingMethodId:req.body.shippingMethod,
                    billAddressId:id,
                    shippingAddressId: shippingAddressId
                })
                req.flash('message', 'Tu pedido se realizo correctamente.');
                return res.redirect(`/users/${req.params.id}/profile#tab-orders`)
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