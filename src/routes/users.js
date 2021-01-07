const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const {check,validationResult, body}= require("express-validator");
const multer = require('multer');
const confirmPassword = require('../middlewares/confirmPassword');
const checkUserDB = require('../middlewares/checkUser');
const assertSignedIn = require('../middlewares/assert-signed-in')
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
  });
   
  var upload = multer({ storage: storage });

/* GET login page. */
router.get('/login',usersController.getLogin);
router.post('/login',[
  check("email").isEmail().withMessage("Email inválido"),
  check("password").isLength({min:8,max:undefined}).withMessage("Contraseña inválida: minimo 8 caracteres"),
],usersController.login)

/* GET register page. */
router.get('/register', usersController.getRegister);
router.post('/register',upload.single("avatar"),[
    check("name").isLength({min:4,max:50}).withMessage("El nombre debe tener entre 4 y 50 caracteres de largo"),
    check("userName").isLength({min:4,max:15}).withMessage("El nombre de usuario debe tener entre 4 y 15 caracteres de largo"),
    check("email").isEmail().withMessage("Email inválido"),
    check("phoneNumber").isMobilePhone().withMessage("Numero de telefono inválido"),
    check("password").isLength({min:8, max:undefined}).isAlphanumeric().withMessage("Contraseña inválida: minimo 8 caracteres,letras(a-zA-Z) y números"), 
],confirmPassword,checkUserDB,usersController.register);

/* GET profile page. */
router.get('/profile',assertSignedIn, usersController.profile);

/* GET confirmation register page. */
router.get('/register/confirmation', usersController.confirmation);

module.exports = router;
