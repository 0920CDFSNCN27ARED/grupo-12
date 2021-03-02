const express = require('express');
const router = express.Router();
const productsController = require("../../controllers/api/productsController");

/* GET product detail page. */
router.get('/', productsController.list);

module.exports = router;