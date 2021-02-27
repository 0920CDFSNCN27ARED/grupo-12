// Require
const fs = require('fs');
const { check, validationResult, body } = require("express-validator");

// Services
const productService = require("../services/productService");
const userService = require("../services/userService");

// Controllers
const commentsController = require("./commentsController");

const productsController = {
    
    //GET Product Details
    getDetails: async (req, res, next) => {
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        const loggedUserId = req.session.loggedUserId;
        try {
            const currentUser = await userService.findOne(loggedUserId);
            const product = await productService.findOne(req.params.id);
            const comments = await productService.productComments(req.params.id);
            const gallery = [product.gallery01, product.gallery02, product.gallery03 ]

            res.render("products/productDetails", {
                currentUser: currentUser,
                message: message,
                errors: validateErrors,
                product: product,
                comments: comments,
                gallery: gallery,
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
        
    },

    // GET Create Product Form
    getCreate: async (req, res, next) => {
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        try {
            const categories = await productService.allCategories();
            const types = await productService.allTypes();
            res.render("products/productCreateForm", {
                message: message,
                errors: validateErrors, 
                categories, 
                types 
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    // POST Create Product Form
    postCreate: async (req, res, next) => {
        let errors = validationResult(req);
        const loggedUserId = req.session.loggedUserId;
        try {
            const currentUser = await userService.findOne(loggedUserId);
            
            let avatar = req.files.avatar;
            if (req.files.avatar != null) {
                avatar = req.files.avatar[0].filename;
            } else {
                avatar = "without-image.png";
            }

            let gallery = [];
            if (req.files.gallery != null) {
                let array = req.files.gallery;
                for (let i = 0; i < array.length; i++) {
                    const image = array[i].filename;
                    gallery.push(image);
                }
            } else {
                gallery = [
                    "without-image.png",
                    "without-image.png",
                    "without-image.png",
                ];
            }

            if (errors.isEmpty()) {
                let newProduct = {
                    shopId: currentUser.shopId,
                    categoryId: req.body.categoryId,
                    typeId: req.body.typeId,
                    name: req.body.name,
                    description: req.body.description,
                    details: req.body.details,
                    brewery: req.body.brewery,
                    price: parseFloat(req.body.price),
                    discount: parseFloat(req.body.discount),
                    stock: req.body.stock || 0,
                    category: req.body.category,
                    type: req.body.type,
                    ibu: req.body.ibu,
                    abv: req.body.abv,
                    og: req.body.og,
                    avatar: avatar,
                    gallery01: gallery[0] ? gallery[0] : "without-image.png",
                    gallery02: gallery[1] ? gallery[1] : "without-image.png",
                    gallery03: gallery[2] ? gallery[2] : "without-image.png",
                };

                req.flash('message', 'El producto fue creado correctamente.');
                await productService.create(newProduct);
                if(currentUser.admin){
                    return res.redirect("/admin#tab-products");
                } else {
                    return res.redirect(`/shops`);
                };
            } else {
                req.flash('validateErrors', errors.errors);
                if(currentUser.admin){
                    return res.redirect("/admin#tab-products");
                } else {
                    return res.redirect(`/shops`);
                };
            }
        } catch (error) {
            res.status(400).send(error.message);    
        }
        
    },

    // Update - Form to edit
    getEdit: async (req, res, next) => {
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        try {
            const product = await productService.findOne(req.params.id)
            const categories = await productService.allCategories();
            const types = await productService.allTypes();
            const productGallery = [product.gallery01, product.gallery02, product.gallery03]
            
            res.render("products/productEditForm", {
                message: message,
                errors: validateErrors,
                product: product,
                gallery: productGallery,
                categories, 
                types 
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    // PUT - Edit Product Form
    putEdit: async (req, res, next) => {
        let errors = validationResult(req);
        const loggedUserId = req.session.loggedUserId;
        
        try {
            const currentUser = await userService.findOne(loggedUserId);
            const product = await productService.findOne(req.params.id)
            const categories = await productService.allCategories();
            const types = await productService.allTypes();
            const productGallery = [product.gallery01, product.gallery02, product.gallery03]

            if (errors.isEmpty()) {
                let avatar = req.files.avatar;
                if (req.files.avatar != null) {
                    // Delete old image
                    fs.unlinkSync(
                        __dirname +
                            "/../public/images/products/" +
                            product.avatar
                    );
                    // Replace old image
                    avatar = req.files.avatar[0].filename;
                } else {
                    avatar = product.avatar;
                }

                let gallery = [];
                if (req.files.gallery != null) {
                    // Delete old image
                    req.files.gallery[0] != null ? fs.unlinkSync( __dirname + "/../public/images/products/" + product.gallery01) : null;
                    req.files.gallery[1] != null ? fs.unlinkSync( __dirname + "/../public/images/products/" + product.gallery02) : null;
                    req.files.gallery[2] != null ? fs.unlinkSync( __dirname + "/../public/images/products/" + product.gallery03) : null;
                    // Replace old image
                    let array = req.files.gallery;
                    for (let i = 0; i < array.length; i++) {
                        const image = array[i].filename;
                        gallery.push(image);
                    }
                } else {
                    gallery = productGallery;
                }

                let ibu = req.body.ibu == "0" ? product.ibu : req.body.ibu;
                let abv = req.body.abv == "0" ? product.abv : req.body.abv;
                let og = req.body.og == "1000" ? product.og : req.body.og;

                let productEdit = {
                    shopId: currentUser.shopId,
                    categoryId: req.body.categoryId,
                    typeId: req.body.typeId,
                    name: req.body.name,
                    description: req.body.description,
                    details: req.body.details,
                    brewery: req.body.brewery,
                    price: parseFloat(req.body.price),
                    discount: parseFloat(req.body.discount),
                    stock: req.body.stock || 0,
                    category: req.body.category,
                    type: req.body.type,
                    ibu: ibu,
                    abv: abv,
                    og: og,
                    avatar: avatar,
                    gallery01: gallery[0],
                    gallery02: gallery[1],
                    gallery03: gallery[2]
                };

                req.flash('message', 'El producto fue actualizado correctamente.');
                await productService.update(req.params.id, productEdit);
                if(currentUser.admin){
                    return res.redirect("/admin#tab-products");
                } else {
                    return res.redirect("/shops#tab-products");
                }
            } else {
                req.flash('validateErrors', errors.errors);
                if(currentUser.admin){
                    return res.redirect("/admin#tab-products");
                } else {
                    return res.redirect(`/products/${req.params.id}/productDetails`);
                }
            }
        } catch (error) {
            res.status(400).send(error.message); 
        }
    },

    // DELETE - Delete one product from DB
    destroy: async (req, res) => {
        try {
            await productService.destroy(req.params.id);
            req.flash('message', 'El producto fue eliminado correctamente.');
            res.redirect("/shops");
        } catch (error) {
            res.status(400).send(error.message);
        }
        
    },

    // Create Comment Form
    postComment: commentsController.create,

    // Delete - Delete one comment
    destroyComment: commentsController.destroy,

};

module.exports = productsController;
