const user = require('../models/model.user');
const product = require('../models/model.product');
const mongoose = require('mongoose');
const sendMail = require('../utils/mail');
const data = require('../utils/data');
const bcrypt = require('bcrypt');

exports.show_register = async (req, res) => {
    res.render('register', { layout: false });
};

exports.show_login = async (req, res) => {
    // if(!req.session.user)
    //     res.redirect('/login')

    res.render('login', { layout: false });
};

exports.show_home = async (req, res) => {
    let data = await product.find().populate('category');
    res.render('shopping/homepage', { data });
};

exports.register = async (req, res) => {
    const { name, email, password, password2 } = req.body;

    try {
        if (password !== password2) {
            res.send({ message: 'password not match' });
            return;
        }
        const token = Math.floor(Math.random() * 1000000);
        const createdUser = await user.create({ name, email, password, token });
        const id = createdUser._id;
        const url = `http://localhost:${process.env.PORT}/verify/${id}/${token}`;
        // send mail
        sendMail(email, 'register account', data(name, url));
        res.redirect('/login');
    } catch (error) {
        // res.send({ message: error.message });
        console.log(error.message);
        res.redirect('/register');
    }
};

exports.emailVerify = async (req, res) => {
    try {
        const responseData = req.params;
        const responseId = responseData.id;
        const responseToken = responseData.token;
        const userId = await user.findOne({ _id: new mongoose.Types.ObjectId(responseId) });

        if (userId.verify == true) {
            // res.send({ message: 'email already verified' });
            console.log('email already verified');
            return res.redirect('/login');
        }

        if (responseId == userId._id && responseToken == userId.token) {
            await user.updateOne({ _id: userId }, { $set: { verify: true } });
            // res.send({ message: 'email verified' });
            console.log('email verified');
        } else console.log('error occured  ');

        res.redirect('/login');
    } catch (error) {
        console.log(error.message);
        res.redirect('/register');
    }
};

//this is login using Oauth
exports.registerOauth = async (req, res) => {
    console.log('hr');
};

// this is simple login only
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await user.findOne({ email });

        if (!userData) {
            console.log('Email not found');
            return res.redirect('/login');
        }

        if (!userData.verify) {
            console.log('Email not verified');
            return res.redirect('/login');
        }

        if (userData.email == email && (await bcrypt.compare(password, userData.password))) {
            req.session.login = true;
            req.session.name = userData.name;
            req.session.email = userData.email;
            req.session.user = userData;
            console.log('login success');

            return res.redirect('/profile');
        } else {
            console.log('Email or password does not match');
        }
        res.redirect('/login');
    } catch (error) {
        console.log(error.message);
    }
};

exports.profile = async (req, res) => {
    try {
        const name = req.session.user?.name;
        const email = req.session.user?.email;
        const data = { name, email };
        res.render('profile', { data });
    } catch (error) {
        console.log(error.message);
    }
};


