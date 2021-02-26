// Require
const { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");

// Services
const userService = require("../../services/userService");

// Controller
const usersController = {

    //GET user profile
    profile: async (req, res, next) => {
        let errors = validationResult(req);
        const id = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(id);
            let user = await userService.findOne(req.params.id);
            let userData = await userService.getCurrentUserData(user);
            
            if (errors.isEmpty()) {            
                res.render("admin/users/admin-user-profile", {
                    admin: currentUser,
                    user: user,
                    comments: userData.comments,
                    orders: userData.orders
                }); 
            } else {
                res.render("admin/users/admin-user-profile", {
                    errors: errors.errors,
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //GET create user form
    createForm: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            if (errors.isEmpty()) {
                res.render("admin/users/admin-create-user-form", {
                    admin: currentUser,
                });
            } else {
                res.render("admin/users/admin-create-user-form", {
                    admin: currentUser,
                    errors: errors.errors,
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //POST create user form
    create: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId; 
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let users = await userService.findAll();
            if (errors.isEmpty()) {
                let avatar = req.file ? req.file.filename : "default-avatar.png";

                for (let i = 0; i < users.length; i++) {
                    const user = users[i];
                    if(req.body.email == user.email && req.body.userName == user.userName){
                        return res.render("admin/users/admin-create-user-form", {
                            admin: currentUser,
                            user: user,
                            errors:[
                            {msg:"El email y usuario ingresado ya se encuentran en uso"}
                        ]});
                    }else if(req.body.email == user.email){
                        return res.render("admin/users/admin-create-user-form", {
                            admin: currentUser,
                            user: user,
                            errors:[
                            {msg:"El email ingresado ya está en uso"}
                        ]});
                    }else if(req.body.userName == user.userName){
                        return res.render("admin/users/admin-create-user-form", {
                            admin: currentUser,
                            user: user,
                            errors:[
                            {msg:"El nombre de usuario ingresado ya está en uso"}
                        ]});
                    }
                };

                await userService.create({
                    name: req.body.name,
                    userName: req.body.userName,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: avatar,
                    admin: req.body.admin,
                    status: req.body.status,
                    dni: null,
                    shopId: null,
                    role:"buyer",
                    bio: req.body.bio || "Escribe algo sobre tí",
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    twitter: req.body.twitter
                });
                res.redirect(`/admin`);
                
            } else {
                res.render("admin/users/admin-create-user-form", {
                    errors: errors.errors,
                    admin: currentUser,
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //GET edit user form
    updateForm: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let user = await userService.findOne(req.params.id);
        
            if (errors.isEmpty()) {
                res.render("admin/users/admin-edit-user-form", {
                    admin: currentUser,
                    user: user,
                });
            } else {
                res.render("admin/users/admin-edit-user-form", {
                    errors: errors.errors,
                    admin: currentUser,
                    user: user
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //PUT edit data user form
    updateData: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let user = await userService.findOne(req.params.id);
            let users = await userService.findAll();

            if (errors.isEmpty()) {
                
                let avatar = req.file ? req.file.filename : user.avatar;

                if(user.role == "seller"){
                    user.role = req.body.role;
                };

                if(req.body.role == "buyer" || user.role == "buyer"){
                    user.shopId = null;
                }

                // for (let i = 0; i < users.length; i++) {
                //     const user = users[i];
                //     if(req.body.email == user.email && req.body.userName == user.userName){
                //         return res.render("admin/users/admin-edit-user-form", {
                //             admin: currentUser,
                //             user: user,
                //             errors:[
                //             {msg:"El email y usuario ingresado ya se encuentran en uso"}
                //         ]});
                //     }else if(req.body.email == user.email){
                //         return res.render("admin/users/admin-edit-user-form", {
                //             admin: currentUser,
                //             user: user,
                //             errors:[
                //             {msg:"El email ingresado ya está en uso"}
                //         ]});
                //     }else if(req.body.userName == user.userName){
                //         return res.render("admin/users/admin-edit-user-form", {
                //             admin: currentUser,
                //             user: user,
                //             errors:[
                //             {msg:"El nombre de usuario ingresado ya está en uso"}
                //         ]});
                //     }
                // };
                
                let userToEdit = {
                    name: req.body.name,
                    userName: req.body.userName,
                    phone: req.body.phone,
                    email: req.body.email,
                    avatar: avatar,
                    admin: req.body.admin,
                    status: req.body.status,
                    shopId: user.shopId,
                    role: user.role,
                    bio: req.body.bio || "Escribe algo sobre tí",
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    twitter: req.body.twitter
                };

                await userService.update(req.params.id, userToEdit)
                res.redirect(`/admin/${req.params.id}/user-profile`);
                
            } else {
                res.render("admin/users/admin-edit-user-form", {
                    errors: errors.errors,
                    admin: currentUser,
                    user: user
                });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //PUT edit pass user form
    updatePass: async (req, res, next) => {
        let errors = validationResult(req);
        let loggedUserId = req.session.loggedUserId;
        try {
            let currentUser = await userService.findOne(loggedUserId);
            let user = await userService.findOne(req.params.id);

            if (errors.isEmpty()) {
                let change_password = "";
                if (req.body.confirmation == req.body.new_password) {
                    change_password = bcrypt.hashSync(req.body.new_password,10);
                } else {
                    change_password = user.password;
                };
                await userService.update(req.params.id,{
                    password: change_password
                });
                res.redirect(`/admin/${req.params.id}/user-profile`);
           
            } else {
                res.render("admin/users/admin-edit-user-form", {
                    errors: errors.errors,
                    admin: currentUser,
                    user: user
                });
            }
         } catch (error) {
            res.status(400).send(error.message);
        }
    },

    //DELETE user
    destroy: async (req, res, next) => {
        try {
            await userService.destroy(req.params.id);
            res.redirect(`/admin`);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },
    
}

module.exports = usersController;