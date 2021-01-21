const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/productsDB.json");
const productsFile = fs.readFileSync(productsFilePath, "utf-8");

let products;
if (productsFile == "") {
    products = [];
} else {
    products = JSON.parse(productsFile);
}

function getCategories() {
    let categories = [];
    products.map((product) => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });
    return categories;
}
categories = getCategories();


const storeController = {
    store: function(req, res) {
        res.render('store/store', { products, categories });
    },
    cart: function(req, res) {
        res.render('store/productCart');
    },
    getCheckout: function(req, res) {
        res.render('store/checkout');
    },
    postCheckout:function(req, res) {
        let errors = validationResult(req);
        
        if (errors.isEmpty()) {
            const newId = orders.length != 0 ? orders[orders.length - 1].id + 1 : 1;
            let newOrder={
                id: newId,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                DNI: req.body.dni,
                country: req.body.country,
                province: req.body.province,
                city: req.body.city,
                postal_code: req.body.postal_code,
                adress: req.body.adress,
                phone: req.body.phone,
                email: req.body.email,
            }
            saveData(orders, newOrder, "../data/ordersDB.json");
            res.redirect("/")
        } else {
            res.render("store/checkout", { errors: errors.errors });
        }
    },
}

module.exports = storeController;