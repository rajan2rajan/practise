const passport = require('passport');
const User = require('../models/model.user');
const GoogleStrategy = require('passport-google-oauth20');

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                callbackURL: '/auth/google/redirect',
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                passReqToCallback: true,
            },
            async (req, accessToken, refreshToken, profile, done) => {
                const name = profile.displayName;
                const googleId = profile.id;
                const image = profile.photos[0].value;
                const email = profile.emails[0].value;

                console.log('Here');
                try {
                    let user = await User.findOne({ email: email });
                    if (!user) {
                        user = await User.create({ name, email, image, googleId, verify: true });

                        console.log('completed' + JSON.stringify(user));
                        console.log('new user created');
                    } else {
                        console.log('user already exists');
                        (req, res) => {
                            req.session.destroy();
                            console.log('user logged out');
                        };
                    }

                    req.session.login = true;
                    req.session.name = name;
                    req.session.email = email;
                    req.session.user = user;

                    done(null, user);
                } catch (error) {
                    console.log(error.message);
                    done(error, null);
                }
            }
        )
    );

    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            cb(null, { username: user.username, name: user.name, email: user.email, image: user.image });
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
};
