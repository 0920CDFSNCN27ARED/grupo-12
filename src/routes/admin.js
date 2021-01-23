// require
const express = require('express');
const {check,validationResult, body}= require("express-validator");
const router = express.Router();
const adminController = require('../controllers/adminController');

// Utils
const multerOneImage = require("../utils/multer/multerOneImage");
const multerProducts = require("../utils/multer/multerProducts");

// Middlewares
const assertIsAdmin = require('../middlewares/assert-is-admin');

// Multer
const uploadUser = multerOneImage('users');
const uploadShop = multerOneImage('shops');
const uploadProduct = multerProducts('products', 'avatar', 'gallery');


//******************* Admin Routes *******************//

// GET Admin Profile
router.get('/', assertIsAdmin, adminController.getAdminProfile);

//******************* Users Routes *******************//

// GET user profile
router.get('/:id/user-profile', assertIsAdmin, adminController.getUserProfile);

// GET edit user data form
router.get('/:id/edit-user', assertIsAdmin, adminController.getEditUserForm);

// GET create user form 
router.get('/create-user', assertIsAdmin, adminController.getCreateUserForm);

// POST create user form 
router.post(
  '/create-user', 
  assertIsAdmin, 
  uploadUser.single("avatar"),
  [
    check("name", "El nombre no puede estar vacio").notEmpty(),
    check("userName", "El nombre de usuario no puede estar vacio").notEmpty(),
    check("email", "Email inválido").isEmail(),
    check("password", "La constraseña es requerida.").notEmpty(),
    check("password", "La constraseña debe tener al menos 8 caracteres.").isLength({ min: 8 }),
    check("password").isLength({min:8, max:undefined}).isAlphanumeric().withMessage("Contraseña inválida: minimo 8 caracteres,letras(a-zA-Z) y números"),
    body('confirmation').custom((value, { req }) => {
        if (value !== req.body.password) { 
            throw new Error('Las contraseñas deben ser iguales');
        } return true 
    }), 
  ],
  adminController.postCreateUserForm);

// PUT edit user data form
router.put(
  '/:id/edit-user-data', 
  assertIsAdmin, 
  uploadUser.single("avatar"),
  [
    check("name", "El nombre no puede estar vacio").notEmpty(),
    check("userName", "El nombre de usuario no puede estar vacio").notEmpty(),
    check("email", "Email inválido").isEmail(),
  ],adminController.putEditDataUserForm);

// PUT edit user password form
router.put(
  '/:id/edit-user-pass', 
  assertIsAdmin,
  [
    check("new_password", "La nueva constraseña es requerida.").notEmpty(),
    check("new_password", "La nueva constraseña debe tener al menos 8 caracteres.").isLength({ min: 8 }),
    body('confirmation').custom((value, { req }) => {
        if (value !== req.body.new_password) { 
            throw new Error('Las contraseñas deben ser iguales');
        } return true 
    }),
  ], 
  adminController.putEditPassUserForm);

// DELETE user 
router.delete('/:id/user-destroy', assertIsAdmin, adminController.destroyUser);

//******************* Shops Routes *******************//

// GET shop profile
router.get('/:id/shop-profile', assertIsAdmin, adminController.getShopProfile);

// POST create user form 
router.post(
  '/create-shop', 
  assertIsAdmin, 
  uploadShop.single("avatar"),
  [
    check("name", "El nombre de la tienda es requerido.").notEmpty(),
    check("email", "Email inválido.").isEmail(),
  ],
  adminController.postCreateShop);

//******************* Products Routes *******************//

// POST create category
router.post(
  '/create-category', 
  assertIsAdmin, 
  [
    check("name", "El nombre de la categoría es requerido.").notEmpty(),
    check("description", "La descripción de la categoría es requerida.").notEmpty(),
    check("typeId", "El tipo de cerveza es requerido.").notEmpty(),
  ],
  adminController.postCreateCategory);

// PUT edit category
router.put(
  '/:id/edit-category', 
  assertIsAdmin, 
  [
    check("name", "El nombre de la categoría es requerido.").notEmpty(),
    check("description", "La descripción de la categoría es requerida.").notEmpty(),
    check("typeId", "El tipo de cerveza es requerido.").notEmpty(),
  ],
  adminController.putEditCategory);

// DELETE category 
router.delete('/:id/category-destroy', assertIsAdmin, adminController.destroyCategory);

// POST create type
router.post(
  '/create-type', 
  assertIsAdmin, 
  [
    check("name", "El nombre del tipo de cerveza es requerido.").notEmpty(),
    check("description", "La descripción del tipo de cerveza es requerida.").notEmpty(),
  ],
  adminController.postCreateType);

// PUT edit type
router.put(
  '/:id/edit-type', 
  assertIsAdmin, 
  [
    check("name", "El nombre del tipo de cerveza es requerido.").notEmpty(),
    check("description", "La descripción del tipo de cerveza es requerida.").notEmpty(),
  ],
  adminController.putEditType);

// DELETE type 
router.delete('/:id/type-destroy', assertIsAdmin, adminController.destroyType);

module.exports = router;