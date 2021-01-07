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
    login:function(req, res) {
        const users= getUsers();
        let errors = validationResult(req);
        let usuarioALoguearse;
        if(errors.isEmpty()){
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (user.email==req.body.email) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        usuarioALoguearse =user;
                        break;
                    }
                }
            }
            if (!usuarioALoguearse) {
                return res.render("users/login",{errors:[
                    {msg: "Email o contraseña incorrectos"}
                ]})
            }
            req.session.loggedUserId = usuarioALoguearse.id;
            if(req.body.remember){
                res.cookie('remember',usuarioALoguearse.email,{maxAge:60000})
            }
            res.redirect("/")
        }else{
            return res.render("users/login",{errors:errors.errors})
        }   
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
                admin: false
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