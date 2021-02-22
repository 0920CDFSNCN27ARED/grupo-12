// Require
const { check, validationResult, body } = require("express-validator");
const fs = require("fs");

// Utils
const getData = require("../utils/getData");
const saveData = require("../utils/saveData");
const updateData = require("../utils/updateData");
const deleteData = require("../utils/deleteData");

// Data
const products = getData("../data/productsDB.json");
const comments = getData("../data/commentsDB.json");
const categories = getData("../data/categoriesDB.json");
const types = getData("../data/typesDB.json");

// Services
const productService = require("../services/productService");
const userService = require("../services/userService");

// Controller
const productsController = {
    //GET Product Details
    getDetails: async (req, res, next) => {
        let errors = validationResult(req);
        try {
            if (errors.isEmpty()) {
                let product = await productService.findOne(req.params.id);
                let comments = await productService.productComments(req.params.id);
                let gallery = [product.gallery01, product.gallery02, product.gallery03 ]

                res.render("products/productDetails", {
                    product: product,
                    comments: comments,
                    avatar: product.avatar,
                    gallery: gallery,
                });
            } else {
                res.render(`/products/productDetails`, {
                    errors: errors.errors,
                });
            }
        } catch (error) {
            
        }
        
    },

    // GET Create Product Form
    getCreate: async (req, res, next) => {
        try {
            const categories = await productService.allCategories();
            const types = await productService.allTypes();
            res.render("products/productCreateForm", { 
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
        try {
            let loggedUserId = req.session.loggedUserId;
            let currentUser = await userService.findOne(loggedUserId);
            const categories = await productService.allCategories();
            const types = await productService.allTypes();

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

                await productService.create(newProduct);
                res.redirect(`/shops`);
            } else {
                res.render("products/productCreateForm", { 
                    errors: errors.errors,
                    categories, 
                    types  
                });
            }
        } catch (error) {
            res.status(400).send(error.message);    
        }
        
    },

    // Update - Form to edit
    getEdit: async (req, res, next) => {
        try {
            const productToEdit = await productService.findOne(req.params.id)
            const categories = await productService.allCategories();
            const types = await productService.allTypes();
            const gallery = [productToEdit.gallery01, productToEdit.gallery02, productToEdit.gallery03]
            
            res.render("products/productEditForm", {
                product: productToEdit,
                avatar: productToEdit.avatar,
                gallery: gallery,
                categories, 
                types 
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    // Update - Method to update
    putEdit: (req, res, next) => {
        let current_user = req.session.current_user;
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let product = products.find((product) => {
                return product.id == req.params.id;
            });

            let findIndex = products.findIndex((product) => {
                return product.id == req.params.id;
            });

            let avatar = req.files.avatar;
            if (req.files.avatar != null) {
                // Delete old image
                fs.unlinkSync(
                    __dirname +
                        "/../public/images/products/" +
                        products[findIndex].avatar
                );
                // Replace old image
                avatar = req.files.avatar[0].filename;
            } else {
                avatar = products[findIndex].avatar;
            }

            let gallery = [];
            if (req.files.gallery != null) {
                let array = req.files.gallery;
                for (let i = 0; i < array.length; i++) {
                    const image = array[i].filename;
                    gallery.push(image);
                }
                } else {
                    gallery = products[findIndex].gallery;
                }

            let ibu = req.body.ibu == "0" ? product.ibu : req.body.ibu;
            let abv = req.body.abv == "0" ? product.abv : req.body.abv;
            let og = req.body.og == "1000" ? product.og : req.body.og;

            let productEdit = {
                id: parseInt(req.params.id),
                shopId: current_user.shopId,
                name: req.body.name,
                description: req.body.description,
                details: req.body.details,
                brewery: req.body.brewery,
                price: parseInt(req.body.price),
                discount: parseInt(req.body.discount),
                stock: parseInt(req.body.stock) || 0,
                category: req.body.category,
                type: req.body.type,
                ibu: ibu,
                abv: abv,
                og: og,
                avatar: avatar,
                gallery: gallery,
            };

            //Reemplazamos el producto
            products.splice(findIndex, 1, productEdit);

            //Agregamos el producto actualizado al array de productos
            updateData(products, "../data/productsDB.json");
            res.redirect(`/products/${req.params.id}/productDetails`);
        } else {
            let productEdit = products.find((product) => {
                return product.id == req.params.id;
            });
            res.render("product-edit-form", {
                errors: errors.errors,
                product: productEdit,
                avatar: productEdit.avatar,
                gallery: productEdit.gallery,
            });
        }
    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
        let deleteProduct = products.filter((product) => {
            return product.id != req.params.id;
        });
        deleteData(products, deleteProduct, "../data/productsDB.json");
        res.redirect("/store");
    },

    // Create Comment Form
    postComment: function (req, res, next) {
        let current_user = req.session.current_user;
        let errors = validationResult(req);
        let f = new Date();
        let date =
            f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();

        if (errors.isEmpty()) {
            let newComment = {
                id: 0,
                userId: current_user.id,
                shopId: current_user.shopId,
                productId: parseInt(req.params.id),
                author: current_user.name,
                avatar: current_user.avatar,
                comment: req.body.comment,
                datetime: date,
                email: current_user.email,
                phone: current_user.phone,
            };

            //Asignamos un id correlativo
            comments.forEach((comment) => {
                if (comment.id >= newComment.id) {
                    newComment.id = comment.id;
                }
            });
            newComment.id = newComment.id + 1;

            //Guardar comentario
            saveData(comments, newComment, "../data/commentsDB.json");
            res.redirect(
                `/products/${req.params.id}/productDetails#product-comments`
            );
        } else {
            let gallery = product.images.gallery;
            const product = products.find((product) => {
                return product.id == req.params.id;
            });
            res.render("products/productDetails", {
                errors: errors.errors,
                product,
                comments: productComments,
                avatar,
                gallery,
            });
        }
    },
    // Delete - Delete one comment
    destroyComment: (req, res) => {
        let comment = comments.find((comment) => {
            return comment.id == req.params.id;
        });

        let productID = comment.productId;

        let deleteComment = comments.filter((comment) => {
            return comment.id != req.params.id;
        });
        deleteData(comments, deleteComment, "../data/commentsDB.json");
        res.redirect(`/products/${productID}/productDetails`);
    },
};

module.exports = productsController;
