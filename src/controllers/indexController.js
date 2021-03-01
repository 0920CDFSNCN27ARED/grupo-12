// Services
const productService = require("../services/productService");
const typeService = require("../services/typeService");

// Index controller
const indexController = {

    // GET home
    home: async (req, res) => {
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        try {
            const products = await productService.findAll();
            const types = await typeService.findAll();
            for (const type of types) {
                type.count = type.products.length;
            }
            res.render('index', { 
                message: message,
                errors: validateErrors,
                products: products, 
                types: types 
            });
        } catch (error) {
            res.status(400).send(error.message);
        }
        
    },

    // GET story
    story: function(req, res) {
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        res.render('story', { 
                message: message,
                errors: validateErrors, 
            });
    },

    // GET contact
    contact: function(req, res) {
        const validateErrors = req.flash('validateErrors')
        const message = req.flash('message');
        res.render('contact', { 
                message: message,
                errors: validateErrors, 
            });
    }
}

module.exports = indexController;