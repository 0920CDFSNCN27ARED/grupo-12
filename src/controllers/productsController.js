// Require
const { check, validationResult, body } = require("express-validator");

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


// Controller
const productsController = {
    //GET Product Details
    getDetails: function (req, res, next) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let product = products.find((product) => {
                return product.id == req.params.id;
            });

            let productComments = [];
            comments.forEach((comment) => {
                if (comment.productId == product.id) {
                    productComments.push(comment);
                }
            });

            res.render("products/productDetails", {
                product: product,
                comments: productComments,
                avatar: product.avatar,
                gallery: product.gallery,
            });
        } else {
            res.render(`/products/productDetails`, {
                errors: errors.errors,
            });
        }
    },

    // GET Create Product Form
    getCreate: function (req, res, next) {
        res.render("products/productCreateForm", {categories,types});
    },

    // POST Create Product Form 
    postCreate: function (req, res, next) {
        let current_user = req.session.current_user;
        let errors = validationResult(req);

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
            gallery = ["without-image.png","without-image.png","without-image.png"];
        }

        if (errors.isEmpty()) {
            let newProduct = {
                id: 0,
                shopId: current_user.shopId,
                name: req.body.name,
                description: req.body.description,
                details: req.body.details,
                brewery: req.body.brewery,
                price: parseInt(req.body.price),
                discount: parseInt(req.body.discount),
                stock: req.body.stock || 0,
                category: req.body.category,
                type: req.body.type,
                ibu: req.body.ibu,
                abv: req.body.abv,
                og: req.body.og,
                avatar: avatar,
                gallery: gallery,
            };

            //Asignamos un id correlativo
            products.forEach((product) => {
                if (product.id >= newProduct.id) {
                    newProduct.id = product.id;
                }
            });
            newProduct.id = newProduct.id + 1;

            //Guardar producto
            saveData(products, newProduct, "../data/productsDB.json");
            res.redirect(`/products/${newProduct.id}/productDetails`);
        } else {
            res.render("products/productCreateForm", { errors: errors.errors });
        }
    },

    // Update - Form to edit
    getEdit: (req, res, next) => {
        let productEdit = products.find((product) => {
            return product.id == req.params.id;
        });
        if (productEdit) {
            let errors = validationResult(req);

            res.render("products/productEditForm", {
                errors: errors.errors,
                product: productEdit,
                avatar: productEdit.avatar,
                gallery: productEdit.gallery,
            });
        } else {
            res.render("error");
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
                fs.unlinkSync(__dirname + '/../public/images/products/'+ products[findIndex].avatar)
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
                };

                //Delete old gallery
                let oldGallery = products[findIndex].gallery;
                for (let i = 0; i < oldGallery.length; i++) {
                    const element = oldGallery[i];
                    fs.unlinkSync(__dirname + '/../public/images/products/'+ element)
                };
            } else {
                gallery = products[findIndex].gallery;
            };

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
        let date = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());

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