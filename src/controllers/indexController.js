// Services
const productService = require("../services/productService");

// Index controller
const indexController = {

    // GET home
    home: async (req, res) => {
        try {
            const products = await productService.findAll();
            const types = await productService.allTypes();

            res.render('index', { 
                products: products, 
                types: types 
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
        
    },

    // GET story
    story: function(req, res) {
        res.render('story');
    },

    // GET contact
    contact: function(req, res) {
        res.render('contact');
    }
}

module.exports = indexController;