const express = require('express');
const router = express.Router();
const typesController = require("../../controllers/api/typesController");

/* GET all types */
router.get("/", typesController.findAll);

module.exports = router;