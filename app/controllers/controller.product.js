// the homepage is shown in auth page when user is login then redirect to shopping/homepage page
const Category = require('../models/model.category');
const Product = require('../models/model.product');
const uuid = require('uuid').v4;

exports.show_create = async (req, res) => {
    const category = await Category.find();
    res.render('shopping/product_create', { category });
};

exports.create = async (req, res) => {
    try {
        //remember file and req.body are different they are send differently
        const filepath = `/images/${uuid()}.${req.files.images.name.split('.').pop()}`;
        await req.files.images.mv(`app/public${filepath}`);
        console.log(`app/public${filepath}`);
        const { name, price, description, category, stock } = req.body;
        await Product.create({ name, price, description, images: filepath, category, stock });
        console.log('product created');
        return res.redirect('/product/create');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/product/create');
    }
};

// this is home page of the website
exports.show_list = async (req, res) => {
    try {
        const data = await Product.find().populate('category');

        return res.render('shopping/homepage', { data });
    } catch (error) {
        console.log(error.message);
    }
};

exports.product_detail = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await Product.findById({ _id: req.params.id }).populate('category');
        return res.render('shopping/product_detail', { data });
    } catch (error) {
        console.log(error.message);
        res.redirect('/');
    }
};

exports.homepage = async (req, res) => {
    try {
        const data = await Product.find().populate('category');
        return res.render('shopping/product_table', { data });
    } catch (error) {
        console.log(error.message);
    }
};

exports.product_edit = async (req, res) => {
    try {
        //edit the product also edit the category and images

        await Product.findByIdAndUpdate({ _id: req.params.id }, {}).populate('category');
        await Category.find();
        return res.render('shopping/product_edit', { data, category });
    } catch (error) {
        console.log(error.message);
        res.redirect('/');
    }
};

exports.product_delete = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        return res.redirect('/homepage');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/homepage');
    }
};
