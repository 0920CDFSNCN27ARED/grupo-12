// Services
const categoryService = require("../../services/categoryService");
const { Category } = require("../../database/models");

// Controller
const categoriesController = {
    findAll: async (req, res) => {
        let allCategories = await categoryService.findAll();
        allCategories.forEach(async (category) => {
            await categoryService.update(category.id, {
                count: category.products.length,
            });
        });
        let count = await Category.count();
        let categories = await categoryService.findAll();

        res.json({
            meta: {
                status: 200,
                url: req.originalUrl,
                totalCount: count,
            },
            data: categories,
            count: count,
        });
    },

    filterType: async (req, res) => {
        let count;
        let filterCategories;
        if(req.params.id > 0) {
            filterCategories = await Category.findAll({
                include: ["products", "types"],
                where: { typeId: req.params.id },
            });
            count = filterCategories.length;
        } else if (req.params.id == 0) {
            filterCategories = await Category.findAll({
                include: ["products", "types"],
            });
            count = filterCategories.length;
        };
        
        res.json({
            meta: {
                status: 200,
                url: req.originalUrl,
                totalCount: count,
            },
            data: filterCategories,
        });
    },
};

module.exports = categoriesController;