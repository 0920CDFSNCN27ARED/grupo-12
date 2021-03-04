const express = require('express');
const router = express.Router();
const productsController = require("../../controllers/api/productsController");

/* GET products List */
router.get('/', productsController.list);

/* GET one product */
router.get('/:id', productsController.findOne);

module.exports = router;