const Blog = require('../models/model.blog');
const Category = require('../models/model.category');

exports.home = async (req, res) => {
    res.render('blog/home');
};

exports.show_create = async (req, res) => {
    const category = await Category.find();
    res.render('blog/create', { category });
};

exports.show_view = async (req, res) => {
    const data = await Blog.find().populate(['author', 'category']);
    res.render('blog/blog', { data });
};

exports.blog_create = async (req, res) => {
    try {
        const { title, description, category, thumbnail, author } = req.body;
        await Blog.create({ title, description, category, thumbnail, author });
        res.redirect('/blog');
    } catch (error) {
        console.log(error.message);
        res.redirect('/blog');
    }
};
