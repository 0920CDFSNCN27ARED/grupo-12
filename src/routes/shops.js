// require
const express = require('express');
const shopsController = require('../controllers/shopsController');
const {check,validationResult, body}= require("express-validator");
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer Config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/shops')
    },
    filename: function (req, file, cb) {
      cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
  });
   
var upload = multer({ storage: storage });

// Routes

// GET shop profile
router.get('/', shopsController.getShop);

// PUT Profile user data
router.put(
  '/edit-data',
  upload.single("avatar"),
  [
    check("name").isLength({min:4,max:30}).withMessage("El nombre debe tener entre 4 y 30 caracteres de largo"),
    check("email").isEmail().withMessage("Email inválido"),
  ],
  shopsController.putShopData);

module.exports = router;