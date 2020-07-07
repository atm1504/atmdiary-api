const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {
    ExtractJwt
} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const config = require('./config.json');
const { User } = require('./models/user')

//JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
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

//LOCAL STRATEGY
passport.use(new LocalStrategy({
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

        //otherwise return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }

}))