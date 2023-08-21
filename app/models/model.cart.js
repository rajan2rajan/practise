const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please enter user'],
        },
        cartItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: [true, 'Please enter product'],
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: {
                    type: Number,
                    required: [true, 'Please enter product price'],
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
