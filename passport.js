const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const { JWT_SECRET} = require("./configs/config");
const { User } = require('./models/user');
const { use } = require('passport');

//JSON WEB TOKENS STRATEGY for api requests
passport.use("access",new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
        try {
            const expTime = payload.exp;
            const ct = Date.now();
            if (ct > expTime) {
                return done({
                message: 'Token has expired! Sign out and login again!',
                status: 400
                }, false);
            }
        const user = await User.findById(payload.id)
        if (!user || user.accessToken != payload.token) {
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
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
        try {
            const user = await User.findOne({ email: payload.email })
            const expTime = payload.exp;
            const ct = Date.now();
            if (ct > expTime) {
                return done({
                message: 'Token has expired! Please resend your token.',
                status: 403
                }, false);
            }
        if (!user) {
            return done({
                message: 'Unauthorized user',
                status: 401
            }, false);
        }
        if (user.resetToken !== payload.token) {
            return done({
                message: 'Invalid token!',
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
        const user = await User.findOne({
            email: email
        });

        if (!user) {
            return done({
                message: 'User not found! Register First.',
                status: 404
            }, false, );
        }
        const isMatch = await user.isValidPassword(password)
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
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}))