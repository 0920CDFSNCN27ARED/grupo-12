const express = require('express');
const storeController = require('../controllers/storeController')
const router = express.Router();

/* GET store page. */
router.get('/', storeController.store);

/* GET cart page. */
router.get('/productCart', storeController.cart);

/* GET checkout page. */
router.get('/checkout', storeController.checkout);

module.exports = router;