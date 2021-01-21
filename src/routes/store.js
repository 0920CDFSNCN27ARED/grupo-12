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

router.post('/checkout', [
    check('first_name','El campo "nombre" no puede estar vacío').isEmpty(),
    check('last_name','El campo "apellido" no puede estar vacío').isEmpty(),
    check('dni','El campo "DNI/CUIT" no puede estar vacío').isEmpty(),
    check('pais','El campo "país" no puede estar vacío').isEmpty(),
    check('province','El campo "provincia" no puede estar vacío').isEmpty(),
    check('city','El campo "ciudad" no puede estar vacío').isEmpty(),
    check('postal_code','El campo "código postal" debe ser un número').isInt(),
    check('adress','El campo "dirección" no puede estar vacío').isEmpty(),
    check('email','El email ingresado es inválido').isEmail(),
],storeController.postCheckout);

module.exports = router;