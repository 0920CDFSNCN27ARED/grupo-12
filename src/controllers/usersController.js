// require
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// Data
const getUsers = require("../utils/getUsers");
const usersFilePath = path.join(__dirname, "../data/usersDB.json");

// Controller
const usersController = {
    // GET Login
    getLogin: function (req, res, next) {
        res.render("users/login");
    },

    // POST Login
    postLogin: function (req, res) {
        const users = getUsers();
        let errors = validationResult(req);
        let userLogin;
        if (errors.isEmpty()) {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (user.email == req.body.email) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        userLogin = user;
                        break;
                    }
                }
            }
            if (!userLogin) {
                return res.render("users/login", {
                    errors: [{ msg: "Email o contraseña incorrectos" }],
                });
            }
            req.session.loggedUserId = userLogin.id;
            if (req.body.remember) {
                res.cookie("remember", userLogin.id, {
                    maxAge: 60000,
                });
            }
            res.redirect("/");
        } else {
            return res.render("users/login", { errors: errors.errors });
        }
    },

    // GET Register
    getRegister: function (req, res, next) {
        res.render("users/register");
    },

    // POST Login
    postRegister: function (req, res, next) {
        let errors = validationResult(req);
        const users = getUsers();
        if (errors.isEmpty()) {
            const newId =
                users.length != 0 ? users[users.length - 1].id + 1 : 1;
            const avatar = req.file ? req.file.filename : "default-avatar.png";
            let user = {
                id: newId,
                name: req.body.name,
                userName: req.body.userName,
                phone: req.body.selectNumber + req.body.phoneNumber,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: avatar,
                admin: false,
                status: "active"
            };
            users.push(user);
            let usersJSON = JSON.stringify(users);
            fs.writeFileSync(usersFilePath, usersJSON);
            res.redirect("login");
        } else {
            res.render("users/register", { errors: errors.errors });
        }
    },

    // DELETE session logout
    destroySession: function (req, res, next) {
        cookie = req.cookies;
        for (var prop in cookie) {
            if (!cookie.hasOwnProperty(prop)) {
                continue;
            }
            res.cookie(prop, "", { expires: new Date(0) });
        }
        req.session.destroy((err) => {
            res.redirect("/users/login");
        });
    },

    // GET user confirmation
    getConfirmation: function (req, res, next) {
        res.render("users/confirmation");
    },

    // GET user profile
    getProfile: function (req, res, next) {
        res.render("users/profile");
    },
};

module.exports = usersController;