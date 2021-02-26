const express = require('express');
const router = express.Router();
const productsController = require("../../controllers/api/productsControllers");
const { check, validationResult, body } = require("express-validator");


/* GET product detail page. */
router.get('/', productsController.list);

module.exports = router;