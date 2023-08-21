const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    status: {
        type: String,
        required: [true, 'Please enter your status'],
        enum: ['active', 'inactive'],
        default: 'active',
    },
});

const category = mongoose.model('category', CategorySchema);

module.exports = category;
