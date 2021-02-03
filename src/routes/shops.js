// require
const express = require('express');
const router = express.Router();
const shopsController = require('../controllers/shopsController');
const {check,validationResult, body}= require("express-validator");

// Utils
const multerOneImage = require("../utils/multer/multerOneImage");
const uploadShop = multerOneImage('shops');

// Middlewares
const assertSignedIn = require('../middlewares/assert-signed-in');

// GET shop profile
router.get('/', assertSignedIn, shopsController.getShop);

// PUT Profile user data
router.put(
  '/edit-data',
  uploadShop.single("avatar"),
  [
    check("name").isLength({min:4,max:30}).withMessage("El nombre debe tener entre 4 y 30 caracteres de largo"),
    check("email").isEmail().withMessage("Email inválido"),
  ],
  shopsController.putShopData);

module.exports = router;