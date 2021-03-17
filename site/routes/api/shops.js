const express = require('express');
const router = express.Router();
const shopsController = require("../../controllers/api/shopsController");

/* GET shops */
router.get("/", shopsController.findAll);

/* GET one shop */
router.get("/:id", shopsController.findOne);

/* GET shops Qty */
router.get("/count", shopsController.shopsCount);

module.exports = router;