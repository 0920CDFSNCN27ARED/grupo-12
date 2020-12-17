const indexController = {
    home: function(req, res) {
        res.render('index', { products: allProducts, types: types });
    },
    story: function(req, res) {
        res.render('story');
    },
    contact: function(req, res) {
        res.render('contact');
    }
}

function getProducts() {
  const fs = require('fs');
  const dbJson = fs.readFileSync('data/productsDB.json', {encoding: "utf-8"});
  return JSON.parse(dbJson)
};
const allProducts = getProducts();

function getTypes() {
    let types = [];
    allProducts.map( product => {
        if( !types.includes(product.type) ){
            types.push(product.type);
        }
    })
    return types;
}
const types = getTypes();

module.exports = indexController;