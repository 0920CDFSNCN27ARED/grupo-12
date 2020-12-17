const fs = require("fs");
const path = require("path");
const { check, validationResult, body } = require("express-validator");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const productsFilePath = path.join(__dirname, "../data/productsDB.json");
const productsFile = fs.readFileSync(productsFilePath, "utf-8");
const commentsFilePath = path.join(__dirname, "../data/commentsDB.json");
const commentsFile = fs.readFileSync(commentsFilePath, "utf-8");

let products;
if (productsFile == "") {
    products = [];
} else {
    products = JSON.parse(productsFile);
};

let comments;
if (commentsFile == "") {
    comments = [];
} else {
    comments = JSON.parse(commentsFile);
};


const productsController = {
    //Product Details
    details: function (req, res, next) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let product = products.find((product) => {
                return product.id == req.params.id;
            });

            let productComments = [];
            comments.forEach((comment) => {
                if (comment.product_id == product.id) {
                    productComments.push(comment);
                }
            });

            // Imagenes
            let avatar = product.images.avatar
                ? product.images.avatar[0].filename
                : "without-image.png";
            let gallery = product.images.gallery;

            res.render("products/productDetails", {
                product: product,
                comments: productComments,
                avatar,
                gallery,
            });
        } else {
            res.render(`/products/productDetails`, {
                errors: errors.errors,
            });
        }
    },

    // Create Product Form
    getCreate: function (req, res, next) {
        res.render("products/productCreateForm");
    },
    postCreate: function (req, res, next) {
        let errors = validationResult(req);

        let galleryImages = req.files ? req.files : (galleryImages = {});

        if (errors.isEmpty()) {
            let newProduct = {
                id: 0,
                name: req.body.name,
                description: req.body.description,
                details: req.body.details,
                brewery: req.body.brewery,
                price: parseInt(req.body.price),
                discount: parseInt(req.body.discount),
                cart: false,
                category: req.body.category,
                type: req.body.type,
                ibu: req.body.ibu,
                abv: req.body.abv,
                og: req.body.og,
                images: galleryImages,
            };

            //Asignamos un id correlativo
            products.forEach((product) => {
                if (product.id >= newProduct.id) {
                    newProduct.id = product.id;
                }
            });
            newProduct.id = newProduct.id + 1;

            //Guardar producto
            products.push(newProduct);
            productsJSON = JSON.stringify(products);
            fs.writeFileSync(productsFilePath, productsJSON);
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
                avatar: productEdit.images.avatar,
                gallery: productEdit.images.gallery,
            });
        } else {
            res.render("error");
        }
    },

    // Update - Method to update
    putEdit: (req, res, next) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let findIndex = products.findIndex((product) => {
                return product.id == req.params.id;
            });

            let galleryImages = req.files;
            if (Object.keys(galleryImages).length === 0) {
                galleryImages = products[findIndex].images;
            }

            let productEdit = {
                id: parseInt(req.params.id),
                name: req.body.name,
                description: req.body.description,
                details: req.body.details,
                brewery: req.body.brewery,
                price: parseInt(req.body.price),
                discount: parseInt(req.body.discount),
                cart: false,
                category: req.body.category,
                type: req.body.type,
                ibu: req.body.ibu,
                abv: req.body.abv,
                og: req.body.og,
                images: galleryImages,
            };

            console.log(galleryImages);

            //Reemplazamos el producto
            products.splice(findIndex, 1, productEdit);

            //Agregamos el producto actualizado al array de productos
            productsJSON = JSON.stringify(products);
            fs.writeFileSync(productsFilePath, productsJSON);
            res.redirect(`/products/${req.params.id}/productDetails`);
        } else {
            let productEdit = products.find((product) => {
                return product.id == req.params.id;
            });
            res.render("product-edit-form", {
                errors: errors.errors,
                product: productEdit,
                avatar: productEdit.images.avatar,
                gallery: productEdit.images.gallery,
            });
        }
    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
        let deleteProduct = products.filter((product) => {
            return product.id != req.params.id;
        });
        products = deleteProduct;
        productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);
        res.redirect("/store");
    },

    // Create Comment Form
    postComment: function (req, res, next) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let newComment = {
                id: 0,
                product_id: parseInt(req.params.id),
                author: req.body.author.trim(),
                avatar: "default-user02.jpg",
                comment: req.body.comment,
                datetime: "28/11/2020",
                email: req.body.email,
                tel: req.body.tel,
            };

            //Asignamos un id correlativo
            comments.forEach((comment) => {
                if (comment.id >= newComment.id) {
                    newComment.id = comment.id;
                }
            });
            newComment.id = newComment.id + 1;

            //Guardar comentario
            comments.push(newComment);
            commentsJSON = JSON.stringify(comments);
            fs.writeFileSync(commentsFilePath, commentsJSON);
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
    // Delete - Delete one product from DB
    destroyComment: (req, res) => {
        let comment = comments.find((comment) => {
            return comment.id == req.params.comment_id;
        });

        let product = products.find(product => {
            return product.id == comment.product_id 
        });

        let deleteComment = comments.filter((comment) => {
            return comment.id != req.params.comment_id;
        });
        comments = deleteComment;
        commentsJSON = JSON.stringify(comments);
        fs.writeFileSync(commentsFilePath, commentsJSON);
        res.redirect(`/products/${product.id}/productDetails#admin`);
    },
};



module.exports = productsController;