// require
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

// Services
const userService = require("../services/userService");


// Controller
const usersController = {

    // GET Login
    getLogin: function (req, res, next) {
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        res.render("users/login",{
            message: message,
            errors: validateErrors,
        });
    },

    // POST Login
    postLogin: async (req, res) => {
        try {
            let errors = validationResult(req);
            let loggedUser;
    
            if (errors.isEmpty()) {
                let users = await userService.findAll();

                for (let i = 0; i < users.length; i++) {
                    const user = users[i];
                    if (user.email == req.body.email) {
                        if (bcrypt.compareSync(req.body.password, user.password)) {
                            loggedUser = user;
                            break;
                        };
                    };
                };

                if (!loggedUser) {
                    return res.render("users/login", {
                        errors: [{ msg: "Email o contraseña incorrectos" }],
                    });
                };

                req.session.loggedUserId = loggedUser.id;

                if (req.body.remember) {
                    res.cookie("remember", loggedUser.id, {
                        maxAge: 60000,
                    });
                };
                req.flash('message', `Hola ${loggedUser.name}, bienvenido nuevamente!`);
                if(loggedUser.admin){
                    res.redirect("/admin");
                } else {
                    res.redirect("/");
                };
            } else {
                req.flash('validateErrors', errors.errors);
                return res.redirect("/users/login");
            }
        } catch (error) {
            res.status(400).send(error.message);
        };
    },

    // GET Register
    getRegister: function (req, res, next) {
        res.render("users/register");
    },

    // POST Register
    postRegister: async (req, res, next) => {
        let errors = validationResult(req);
        try {
            if (errors.isEmpty()) {
                const avatar = req.file ? req.file.filename : "default-avatar.png";
            
                let newUser = {
                    name: req.body.name,
                    userName: req.body.userName,
                    phone: req.body.selectNumber + req.body.phoneNumber,
                    email: req.body.email,
                    dni: null,
                    password: bcrypt.hashSync(req.body.password, 10),
                    avatar: avatar,
                    admin: false,
                    status: "active",
                    role:"buyer",
                    bio: "",
                    facebook: "",
                    instagram: "",
                    twitter: "",
                    shopId: null,
                    addressId: null
                };
                
                await userService.create(newUser);
                res.redirect("/users/login");
            } else {
                res.render("users/register", { errors: errors.errors });
            }
        } catch (error) {
            res.status(400).send(error.message);
        };
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

    /************************ USER PROFILE **************************/

    // GET user profile
    getProfile: async (req, res, next) => {
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let userData = await userService.getCurrentUserData(currentUser);

            res.render("users/profile", {
                message: message,
                errors: validateErrors,
                comments: userData.comments,
                orders: userData.orders,
                currentUser,
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    // PUT user profile data form
    putUserData: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let userData = await userService.getCurrentUserData(currentUser);
            
            if (errors.isEmpty()) {

                let filename = req.file
                    ? req.file.filename
                    : currentUser.avatar;
                
                let userToEdit = {
                    name: req.body.name,
                    userName: req.body.userName,
                    phone: req.body.phone,
                    email: req.body.email,
                    avatar: filename,
                    bio: req.body.bio,
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    twitter: req.body.twitter
                };

                await userService.update(currentUser.id, userToEdit)
                res.redirect("/users/profile");

            } else {
                res.render("users/profile", { 
                    errors: errors.errors,
                    currentUser: currentUser,
                    comments: userData.comments,
                    orders: userData.orders, 
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    // PUT user profile password form
    putUserPassword: async (req, res, next) => {
        let errors = validationResult(req);
        try {
            let id = req.session.loggedUserId;
            let currentUser = await userService.findOne(id);
            let userData = await userService.getCurrentUserData(currentUser);
            let change_password = "";
            
            if (errors.isEmpty()) {
                
                if (!bcrypt.compareSync(req.body.password, currentUser.password)) {
                    return res.render("users/profile", {
                        errors: [{msg:"La contraseña actual ingresada es incorrecta"}],
                        currentUser: currentUser,
                        comments: userData.comments,
                        orders: userData.orders, 
                    });
                }

                if (req.body.confirmation == req.body.new_password) {
                    change_password = bcrypt.hashSync(req.body.new_password,10);
                } else {
                    change_password = currentUser.password;
                }

                let userToEdit = {
                    password: change_password,   
                };

                await userService.update(id, userToEdit)
                res.redirect("/users/profile");
            } else {
                res.render("users/profile", { 
                    errors: errors.errors,
                    currentUser: currentUser,
                    comments: userData.comments,
                    orders: userData.orders, 
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    // GET user confirmation
    getConfirmation: function (req, res, next) {
        res.render("users/confirmation");
    },
};

module.exports = usersController;