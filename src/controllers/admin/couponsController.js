// Require
const { check, validationResult, body } = require("express-validator");

// Services
const couponService = require("../../services/couponService");

// Controller
const couponsController = {

    //POST create coupon
    create: async (req, res, next) => {
        let errors = validationResult(req);
        try {
            if (errors.isEmpty()) {
                await couponService.create({
                    name: req.body.name,
                    description: req.body.description,
                    discount: req.body.discount,
                    couponCode: req.body.couponCode,
                    shopId: req.body.shopId
                });
                req.flash('message', 'El cupón fue creado correctamente.');
                res.redirect("/admin#tab-coupons");
            } else {
                req.flash('validateErrors', errors.errors);
                res.redirect("/admin#tab-coupons");
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //PUT edit coupon
    update: async (req, res, next) => {
        let errors = validationResult(req);
        try { 
            if (errors.isEmpty()) {
                await couponService.update(req.params.id, {
                    name: req.body.name,
                    description: req.body.description,
                    discount: req.body.discount,
                    couponCode: req.body.couponCode,
                    shopId: req.body.shopId
                });
                req.flash('message', 'El cupón fue actualizado correctamente.');
                res.redirect("/admin#tab-coupons");
            } else {
                req.flash('validateErrors', errors.errors);
                res.redirect("/admin#tab-coupons");
            }
         } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //DELETE coupon
    destroy: async (req, res, next) => {
        try {
            await couponService.destroy(req.params.id);
            req.flash('message', 'El cupón fue eliminado correctamente.');
            res.redirect("/admin#tab-coupons");
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

}

module.exports = couponsController;