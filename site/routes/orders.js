const express = require('express');
const ordersController = require('../controllers/ordersController')
const router = express.Router();
const {check,validationResult, body}= require("express-validator");

/* GET order details page. */
router.get('/:id/orderDetails', ordersController.getOrderDetails);

module.exports = router;