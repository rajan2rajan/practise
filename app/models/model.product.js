const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter product name'],
            trim: true,
            maxLength: [100, 'Product name cannot exceed 100 characters'],
        },
        price: {
            type: String,
            required: [true, 'Please enter product price'],
            maxLength: [5, 'Product price cannot exceed 5 characters'],
            default: 0.0,
        },
        description: {
            type: String,
            required: [true, 'Please enter product description'],
        },
        ratings: {
            type: Number,
            default: 0,
        },
        images: {
            type: String,
            required: [true, 'Please enter product image'],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: [true, 'Please enter product category'],
        },

        stock: {
            type: Number,
            required: [true, 'Please enter product stock'],
            maxLength: [5, 'Product stock cannot exceed 5 characters'],
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;