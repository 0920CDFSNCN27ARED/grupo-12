// require
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// Utils
const getData = require("../utils/getData");
const saveData = require("../utils/saveData");
const updateData = require("../utils/updateData");
const getCurrentUserData = require("../utils/getCurrentUserData");

// Data
let users = getData("../data/usersDB.json");

// Controller
const usersController = {
    // GET Login
    getLogin: function (req, res, next) {
        res.render("users/login");
    },

    // POST Login
    postLogin: function (req, res) {
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
            req.session.current_user = userLogin;
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

    // POST Register
    postRegister: function (req, res, next) {
        let errors = validationResult(req);
        
        if (errors.isEmpty()) {
            const newId = users.length != 0 ? users[users.length - 1].id + 1 : 1;
            const avatar = req.file ? req.file.filename : "default-avatar.png";
            
            let newUser = {
                id: newId,
                name: req.body.name,
                userName: req.body.userName,
                phone: req.body.selectNumber + req.body.phoneNumber,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: avatar,
                admin: false,
                status: "active",
                bio: "",
                facebook: "",
                instagram: "",
                twitter: ""
            };
            
            saveData(users, newUser, "../data/usersDB.json");
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
        let current_user = req.session.current_user;
        let userData = getCurrentUserData(current_user);
        let userComments = userData.userComments;
        let userProducts = userData.userProducts;

        res.render("users/profile", {
            comments: userComments,
            products: userProducts,
        });
    },

    // PUT user profile data form
    putUserData: function (req, res, next) {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        
        if (errors.isEmpty()) {

            let findIndex = users.findIndex((user) => {
                return user.id == current_user.id;
            });
            let filename = req.file
                ? req.file.filename
                : users[findIndex].avatar;
            
            let userToEdit = {
                id: current_user.id,
                name: req.body.name,
                userName: req.body.userName,
                phone: req.body.phone,
                email: req.body.email,
                password: current_user.password,
                avatar: filename,
                admin: false,
                status: "active",
                bio: req.body.bio,
                facebook: req.body.facebook,
                instagram: req.body.instagram,
                twitter: req.body.twitter
            };

            // Actualizamos datos del user
            users.splice(findIndex, 1, userToEdit);

            updateData(users, "../data/usersDB.json");
            res.redirect("/users/profile");

        } else {
            let current_user = req.session.current_user;
            let userData = getCurrentUserData(current_user);
            let userComments = userData.userComments;
            let userProducts = userData.userProducts;
            
            res.render("users/profile", { 
                errors: errors.errors,
                current_user,
                comments: userComments,
                products: userProducts, 
            });
        }
    },

    // PUT user profile password form
    putUserPassword: function (req, res, next) {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        let userData = getCurrentUserData(current_user);
        let userComments = userData.userComments;
        let userProducts = userData.userProducts;
        let change_password = "";
        
        if (errors.isEmpty()) {

            let findIndex = users.findIndex((user) => {
                return user.id == current_user.id;
            });
            
            if (!bcrypt.compareSync(req.body.password, current_user.password)) {
                    return res.render("users/profile", {
                        errors: [{msg:"La contraseña actual ingresada es incorrecta"}],
                        current_user,
                        comments: userComments,
                        products: userProducts, 
                    });
                }

            if (req.body.confirmation == req.body.new_password) {
                change_password = bcrypt.hashSync(req.body.new_password,10);
            } else {
                change_password = current_user.password;
            }

            let userToEdit = {
                id: current_user.id,
                name: current_user.name,
                userName: current_user.userName,
                phone: current_user.phone,
                email: current_user.email,
                password: change_password,
                avatar: current_user.avatar,
                admin: false,
                status: "active",
                bio: current_user.bio,
                facebook: current_user.facebook,
                instagram: current_user.instagram,
                twitter: current_user.twitter
            };

            // Actualizamos datos del user
            users.splice(findIndex, 1, userToEdit);

            updateData(users, "../data/usersDB.json");
            res.redirect("/users/profile");

        } else {

            res.render("users/profile", { 
                errors: errors.errors,
                current_user,
                comments: userComments,
                products: userProducts, 
            });
        }
    },
};

module.exports = usersController;