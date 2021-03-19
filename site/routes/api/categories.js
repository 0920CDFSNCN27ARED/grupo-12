const express = require('express');
const router = express.Router();
const categoriesController = require("../../controllers/api/categoriesController");

/* GET all categories */
router.get("/", categoriesController.findAll);

/* GET all categories por type */
router.get("/types/:id", categoriesController.filterType);

module.exports = router;