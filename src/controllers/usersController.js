const getUsers = require("../utils/getUsers");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const usersFilePath = path.join(__dirname, "../data/usersDB.json");
const bcrypt = require("bcrypt");

const usersController = {
    getLogin: function(req, res, next) {
        res.render('users/login');
    },
    getRegister: function(req, res, next) {
        res.render('users/register');
    },
    register:function(req, res, next) {
        let errors = validationResult(req);
        const users= getUsers();
        if(errors.isEmpty()){
            const newId = users.length !=0 ? users[users.length - 1].id + 1 : 1;
            const avatar = req.file ? req.file.filename: "default-avatar.png"
            let user = {
                id : newId,
                name: req.body.name,
                userName: req.body.userName,
                phone: req.body.selectNumber + req.body.phoneNumber,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10),
                avatar: avatar,
            };
            users.push(user);
            let usersJSON = JSON.stringify(users);
            fs.writeFileSync(usersFilePath, usersJSON);
            res.redirect("login");
        }else{
            res.render("users/register",{errors:errors.errors})
        }
    },
    confirmation:function(req, res, next) {
        res.render('users/confirmation');
    },
    profile: function(req, res, next) {
        res.render('users/profile');
    },
}

module.exports = usersController;