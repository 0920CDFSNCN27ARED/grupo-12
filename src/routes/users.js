const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

/* GET login page. */
router.get('/login', usersController.login);

/* GET register page. */
router.get('/register', usersController.register);

/* GET profile page. */
router.get('/profile', usersController.profile);

/* GET confirmation register page. */
router.get('/register/confirmation', usersController.confirmation);

module.exports = router;
