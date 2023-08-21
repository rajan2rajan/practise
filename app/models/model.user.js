const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
        },
        password: {
            type: String,
            minlength: 8,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        googleId: {
            type: String,
        },
        image: {
            type: String,
        },
        token: {
            type: String,
            expires: 3600, // this is for 1 hour
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('save', async function (next) {
    if (this.password) this.password = await bcrypt.hash(this.password, 10);
    next();
});

const user = mongoose.model('user', UserSchema);

module.exports = user;
