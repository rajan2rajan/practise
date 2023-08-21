const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter your title'],
    },
    description: {
        type: String,
        required: [true, 'Please enter your description'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: [true, 'Please enter your category'],
    },
    thumbnail: {
        type: String,
        required: [true, 'Please enter your thumbnail'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Please enter your author'],
    },
});

const blog = mongoose.model('blog', BlogSchema);

module.exports = blog;
