const Cart = require('../models/model.cart');
const Product = require('../models/model.product');
exports.show_cart = async (req, res) => {
    try {
        // const data = await Cart.find({ user: req.session.user._id });
        res.render('cart/cart');
    } catch (error) {
        console.log(error.message);
    }
};

exports.add_to_cart = async (req, res) => {
    try {
        const data = await Product.findById({ _id: req.params.id });
        req.session.data = data;
        console.log('data added to session sucessfully');
    } catch (error) {
        console.log(error.message);
    }
};
