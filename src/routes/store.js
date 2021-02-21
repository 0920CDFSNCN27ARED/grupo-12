const express = require('express');
const storeController = require('../controllers/storeController')
const router = express.Router();
const {check,validationResult, body}= require("express-validator");

/* GET store page. */
router.get('/', storeController.store);

/* GET cart page. */
router.get('/productCart', storeController.cart);

/* GET checkout page. */
router.get('/checkout', storeController.getCheckout);

 router.post('/checkout', //[
//     check('name').isEmpty().withMessage('El campo "nombre" no puede estar vacío'),
//     check('dni').isEmpty().withMessage('El campo "DNI/CUIT" no puede estar vacío'),
//     check('billingCountry').isEmpty().withMessage('El campo "país" no puede estar vacío'),
//     check('billingProvince').isEmpty().withMessage('El campo "provincia" no puede estar vacío'),
//     check('billingCity').isEmpty().withMessage('El campo "ciudad" no puede estar vacío'),
//     check('billingPostalCode').isInt().withMessage('El campo "código postal" debe ser un número'),
//     check('billingAddress').isEmpty().withMessage('El campo "dirección" no puede estar vacío'),
//     check('email').isEmail().withMessage('El email ingresado es inválido'),
//     check('phone').isMobilePhone().withMessage('El teléfono ingresado es inválido'),]
storeController.postCheckout);

module.exports = router;