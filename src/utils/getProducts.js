function getProducts() {
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
    return products;
}

module.exports = getProducts;
