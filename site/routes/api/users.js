const express = require('express');
const router = express.Router();
const usersController = require("../../controllers/api/usersController");

/* GET products */
router.get("/", usersController.findAll);

/* GET one product */
router.get("/:id", usersController.findOne);

/* GET products Qty */
router.get("/count", usersController.userCount);

module.exports = router;