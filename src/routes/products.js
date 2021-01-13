const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productsController = require("../controllers/productsController");
const { check, validationResult, body } = require("express-validator");
const assertIsAdmin = require('../middlewares/assert-is-admin');
const assertIsSeller = require('../middlewares/assert-is-seller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/products");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});
imagesUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 3 }])

/**** PRODUCTS ROUTES ****/

/* GET product detail page. */
router.get('/:id/productDetails', productsController.getDetails);

// GET Create product page
router.get(
    '/create', 
    assertIsSeller,
    productsController.getCreate);

// POST Create product page    
router.post(
    "/create",
    assertIsSeller,
    imagesUpload,
    [
        check("name", "El nombre no puede estar vacio").notEmpty(),
        check("price", "El precio no puede estar vacio").notEmpty(),
        check("price", "El precio debe ser un numero").isNumeric(),
        check("discount", "El descuento no puede estar vacio").notEmpty(),
        check("discount", "El descuento debe ser un numero").isNumeric(),
        check("category", "Seleccione una categoría").notEmpty(),
        check("type", "Seleccione un tipo de cerveza").notEmpty(),
        check("brewery", "La cervecería no debe estar vacia").notEmpty(),
        check(
            "description",
            "La descripcion debe tener al menos 10 caracteres"
        ).isLength({ min: 10 }),
    ],
    productsController.postCreate
);

// GET Edit product page
router.get(
    '/:id/edit', 
    assertIsSeller, 
    productsController.getEdit);

// PUT Edit product page
router.put(
    "/:id/edit",
    assertIsSeller,
    imagesUpload,
    [
        check("name", "El nombre no puede estar vacio").notEmpty(),
        check("price", "El precio no puede estar vacio").notEmpty(),
        check("price", "El precio debe ser un numero").isNumeric(),
        check("discount", "El descuento no puede estar vacio").notEmpty(),
        check("discount", "El descuento debe ser un numero").isNumeric(),
        check("category", "Seleccione una categoría").notEmpty(),
        check("type", "Seleccione un tipo de cerveza").notEmpty(),
        check("brewery", "La cervecería no debe estar vacia").notEmpty(),
        check(
            "description",
            "La descripcion debe tener al menos 10 caracteres"
        ).isLength({ min: 10 }),
    ],
    productsController.putEdit
);

// DELETE one product 
router.delete(
    '/delete/:id', 
    assertIsSeller, 
    productsController.destroy);

/**** PRODUCT COMMENTS ROUTES ****/

// POST comments
router.post(
    "/:id/productDetails",
    [
        check("comment", "El descuento no puede estar vacio").notEmpty(),
    ],
    productsController.postComment
);

// DELETE comments
router.delete(
    '/deleteComment/:id', 
    productsController.destroyComment);

module.exports = router;
