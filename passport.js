const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {
    ExtractJwt
} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const config = require('./config.json');
const { User } = require('./models/user')

//JSON WEB TOKENS STRATEGY for api requests
passport.use("requestAuth",new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub)
        if (!user) {
            return done({
                message: 'Unauthorized user',
                status: 401
            }, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

// JSON Web Token Strategy for reset tokens
passport.use("resetToken",new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
    secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.find({ email: payload.email })
        if (!user) {
            return done({
                message: 'Unauthorized user',
                status: 401
            }, false);
        }
        if (user.token != payload.token) {
            return done({
                message: 'Invalid token! Or your token has expired!',
                status: 401
            }, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

// Signin strategy
passport.use("signin",new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        //find the user given the email
        const user = await User.findOne({
            email: email
        });

        //if not handle it
        if (!user) {
            return done({
                message: 'User not found! Register First.',
                status: 404
            }, false, );
        }

        const isMatch = await user.isValidPassword(password)

        //if not, handle it
        if (!isMatch) {
            return done({
                message: 'Wrong Password! Try again!',
                status: 401
            }, false);
        }
        if (user.active == 0) {
            return done({
                message: 'Account not verified. Please verify your email first.',
                status: 401
            }, false);
        }
        //otherwise return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }

}))