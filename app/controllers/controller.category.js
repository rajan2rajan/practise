const category = require('../models/model.category');

exports.show_create = async (req, res) => {
    res.render('category/create');
};

exports.show_category = async (req, res) => {
    const data = await category.find();
    res.render('category/category', { data });
};

exports.category_create = async (req, res) => {
    try {
        const { name, status } = req.body;
        await category.create({ name, status });
        res.redirect('/category');
    } catch (error) {
        console.log(error.message);
    }
};
