const getUsers = require("../utils/getUsers");
const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/usersDB.json");

const usersController = {
    getLogin: function(req, res, next) {
        res.render('users/login');
    },
    getRegister: function(req, res, next) {
        res.render('users/register');
    },
    register:function(req, res, next) {
        let users= getUsers();
        const newId = users.length !=0 ? users[users.length - 1].id + 1 : 1;
        let user = {
            id : newId,
            name: req.body.name,
            userName: req.body.userName,
            phone: req.body.selectNumber + req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password,
        };
        users.push(user);
        let usersJSON = JSON.stringify(users);
        fs.writeFileSync(usersFilePath, usersJSON);
        res.redirect("login");
    },
    confirmation:function(req, res, next) {
        res.render('users/confirmation');
    },
    profile: function(req, res, next) {
        res.render('users/profile');
    },
}

module.exports = usersController;