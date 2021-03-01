// require
const express = require('express');
const router = express.Router();
const shopsController = require('../controllers/shopsController');
const couponsController = require("../controllers/couponsController");
const {check,validationResult, body}= require("express-validator");

// Utils
const multerOneImage = require("../utils/multer/multerOneImage");
const uploadShop = multerOneImage('shops');

// Middlewares
const assertSignedIn = require('../middlewares/assert-signed-in');

// GET shop profile
router.get('/:id/profile', assertSignedIn, shopsController.getShop);

// PUT Profile shop data
router.put(
  '/:id/edit-data',
  uploadShop.single("avatar"),
  [
    check("name").isLength({min:4,max:30}).withMessage("El nombre debe tener entre 4 y 30 caracteres de largo"),
    check("email").isEmail().withMessage("Email inválido"),
  ],
  shopsController.putShopData);

//******************* Coupons Routes *******************//

// POST create coupon
router.post(
  '/:shop/create-coupon',
  assertSignedIn,   
  [
    check("name", "El nombre del cupón es requerido.").notEmpty(),
    check("description", "La descripción del cupón es requerida.").notEmpty(),
    check("discount", "El descuento del cupón es requerido.").notEmpty(),
    check("couponCode", "El código del cupón es requerido.").notEmpty(),
    check("shopId", "La tienda emisora del cupón es requerida.").notEmpty(),
  ],
  couponsController.createCoupon);

// PUT edit coupon
router.put(
  '/:shop/:id/edit-coupon',
  assertSignedIn, 
  [
    check("name", "El nombre del cupón es requerido.").notEmpty(),
    check("description", "La descripción del cupón es requerida.").notEmpty(),
    check("discount", "El descuento del cupón es requerido.").notEmpty(),
    check("couponCode", "El código del cupón es requerido.").notEmpty(),
    check("shopId", "La tienda emisora del cupón es requerida.").notEmpty(),
  ],
  couponsController.updateCoupon);

// POST blocked coupon 
router.post('/:shop/:id/coupon-blocked', assertSignedIn, couponsController.blockedCoupon);

// POST activate coupon 
router.post('/:shop/:id/coupon-activate', assertSignedIn, couponsController.activateCoupon);

// DELETE coupon 
router.delete('/:shop/:id/coupon-destroy', assertSignedIn, couponsController.destroyCoupon);

module.exports = router;