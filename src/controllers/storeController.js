//Require
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

//Models
const {Order, Address} = require("../database/models")

// Services
const orderService = require("../services/orderService");
const productService = require("../services/productService");
const userService = require("../services/userService");
const addressService = require("../services/addressService");

const storeController = {
    store: async function (req, res) {
        try {
            let products = await productService.findAll();
            let categories = await productService.allCategories();
            res.render("store/store", { products, categories });
        } catch (error) {
            res.status(404).send(error.message);
        }
    },
    cart: function (req, res) {
        res.render("store/productCart");
    },
    getCheckout: function (req, res) {
        res.render("store/checkout");
    },
    postCheckout: async (req, res) => {
        let errors = validationResult(req);
        console.log(errors.errors)
        console.log(req.body)
        try{
            if (errors.isEmpty()) {
                let current_user = req.session.current_user;
                let userId= current_user != undifined ? current_user.id : null;
                let addreses = await addressService.findAll();
                let id = addresses.length != 0 ? addreses[addresses.length -1].id +1 : 1; 
                
                await addressService.create({
                    id: id,
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
                        id: id +1,
                        fullName: req.body.name,
                        address: req.body.shippingAddress,
                        city: req.body.shippingCity,
                        province: req.body.shippingProvince,
                        postalCode: req.body.shippingPostalCode,
                        country: req.body.shippingCountry,
                        userId: userId,
                    })
                }   
                if(req.body.save-data && current_user){
                    await userService.update(userId,{
                        dni: req.body.dni,
                        addressId: id
                    })
                };
                if(req.body.password && !current_user){
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
                res.redirect("/")
            } else {
                res.render("store/checkout", { errors: errors.errors });
            }
        }catch(error){
            res.status(400).send(error.message);
        }
    },
};

module.exports = storeController;