const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

/* GET login page. */
router.get('/login', usersController.login);

/* GET login page. */
router.get('/register', usersController.register);

module.exports = router;
