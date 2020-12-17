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
    checkout: function(req, res) {
        res.render('store/checkout');
    }
}

module.exports = storeController;