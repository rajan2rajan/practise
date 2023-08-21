const router = require('express').Router();
const auth = require('../controllers/controller.auth');
const passport = require('passport');

router.get('/login', auth.show_login); // this is to show the login page
router.post('/login', auth.loginUser); // this is to login the user

router.get('/register', auth.show_register); // this is to show the register page
router.post('/register', auth.register); // this is to register the user
router.get('/verify/:id/:token', auth.emailVerify); // this is to verify the email address

router.get('/', auth.show_home); // this is the homepage for an shoping website

router.get('/profile', auth.profile); // this is to show the profile page

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log('user logged out');
        res.redirect('/login');
    });
});

//google Oauth routes

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/auth/google/redirect',
    passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/profile' })
);

module.exports = router;
