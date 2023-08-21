const express = require('express');
const app = express();
const PORT = 8000;
const passport = require('passport');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const expresssession = require('express-session');
const connectDb = require('./app/config/connectDb');
const fileupload = require('express-fileupload');

require('./app/config/passport')(passport);

const expressLayouts = require('express-ejs-layouts');

connectDb();
// to use style page

app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.set('layout', 'layouts/main');

app.use(cookieParser());
app.use(express.json());
app.use(
    expresssession({
        secret: 'helping',
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false, // this is for https
            httpOnly: true, // this is for not to access the cookie from client side
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

// passport and its middleware
app.use(passport.initialize());
app.use(passport.session());

// to use express layouts
app.use(expressLayouts);
// Set up static files
app.use(express.static('./app/public'));

const isAuth = require('./app/middlewares/isAuth');

app.use(require('./app/routers/router.auth'));
app.use(isAuth);
// app.use(require('./app/routers/router.blog'));
app.use(require('./app/routers/router.category'));
app.use(require('./app/routers/router.product'));
app.use(require('./app/routers/router.cart'));

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});
