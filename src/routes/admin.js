// require
const express = require('express');
const adminController = require('../controllers/adminController');
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

//*******************Routes*******************//

// GET Admin Profile
router.get('/', adminController.getAdminProfile);

// GET user profile
router.get('/:id/user-profile', adminController.getUserProfile);

// GET edit user form
router.get('/:id/edit-user-data', adminController.getEditUserForm);

// GET create user form 
router.get('/create-user', adminController.getCreateUserForm);


module.exports = router;