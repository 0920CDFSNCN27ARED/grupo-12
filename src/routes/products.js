const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productsController = require("../controllers/productsController");
const { check, validationResult, body } = require("express-validator");

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
router.get('/:id/productDetails', productsController.details);

/* Create product page. */
router.get('/create', productsController.getCreate);
router.post(
    "/create",
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

/* Edit product page. */
router.get('/:id/edit', productsController.getEdit);
router.put(
    "/:id/edit",
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

/* Delete one product */ 
router.delete('/delete/:id', productsController.destroy);

/**** PRODUCT COMMENTS ROUTES ****/
router.post("/:id/productDetails",
    // [
    //     check("autor", "El nombre no puede estar vacio").notEmpty(),
    //     check("email", "El precio no puede estar vacio").notEmpty(),
    //     check("comment", "El descuento no puede estar vacio").notEmpty(),
    // ],
    productsController.postComment
);
router.delete('/deleteComment/:comment_id', productsController.destroyComment);

module.exports = router;
