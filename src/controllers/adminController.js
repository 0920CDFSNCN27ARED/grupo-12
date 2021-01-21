// Require
const { check, validationResult, body } = require("express-validator");

// Utils
const db = require("../database/models");

// Data
const getCurrentUserData = require("../utils/getCurrentUserData");

// Controller
const adminController = {
    
    //GET admin Profile
    getAdminProfile: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        
        if (errors.isEmpty()) {
            try {
                let users = await db.Users.findAll();
                res.render("admin/admin-profile", {
                    admin: current_user,
                    users
                });
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.render("admin/admin-profile", {
                errors: errors.errors,
            });
        }
    },

    //GET edit user form
    getEditUserForm: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        
        if (errors.isEmpty()) {
            try {
                let user = await db.Users.findByPk(req.params.id);
                
                res.render("admin/users/admin-edit-user-form", {
                    admin: current_user,
                    user: user,
                });
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.render("admin/users/admin-edit-user-form", {
                errors: errors.errors,
            });
        }
    },

    //GET user profile
    getUserProfile: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        
        if (errors.isEmpty()) {
            try {
                let user = await db.Users.findByPk(req.params.id);
                
                // Temporal
                let userData = getCurrentUserData(user);
                let userComments = userData.userComments;
                
                res.render("admin/users/admin-user-profile", {
                    admin: current_user,
                    user: user,
                    comments: userComments
                });
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.render("admin/users/admin-user-profile", {
                errors: errors.errors,
            });
        }
    },

    //GET create user form
    getCreateUserForm: async (req, res, next) => {
        let errors = validationResult(req);
        let current_user = req.session.current_user;
        
        if (errors.isEmpty()) {
            try {
                res.render("admin/users/admin-create-user-form", {
                    admin: current_user,
                });
            } catch (error) {
                res.status(400).send(error.message);
            }
        } else {
            res.render("admin/users/admin-create-user-form", {
                errors: errors.errors,
            });
        }
    },
};

module.exports = adminController;