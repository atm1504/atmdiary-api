const { check, body, query, oneOf, validationResult } = require('express-validator/check');
const { User } = require("./../models/user");


exports.postSignupValidationCheck = [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
            val = value.toString();
            return User.findOne({ email: val }).then((userDoc) => {
                if (userDoc) {
                    return Promise.reject('E-Mail exists already, please pick a different one.');
                }
                return true;
            });
        })
        .normalizeEmail(),
    body('password', 'Please enter a password with only numbers and text and at least 5 characters.')
        .isLength({
            min: 5
        })
        .isAlphanumeric()
        .trim(),
    body('confirmPassword').trim().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords have to match!');
        }
        return true;
    }),
    body("gender").trim().custom((value, { req }) => {
        gen = value.toString();
        if (gen === "m" || gen === "f") {
            return true;
        }
        throw new Error('Incorrect gender value');
    })
];

exports.postSigninValidationCheck = [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
            val = value.toString();
            return User.findOne({ email: val }).then((userDoc) => {
                if (userDoc) {
                    return true;
                }
                return Promise.reject("E-Mail doesn't. Register first");
            });
        })
        .normalizeEmail(),
    body('password', 'Please enter a password with only numbers and text and at least 5 characters.')
        .isLength({
            min: 5
        })
        .isAlphanumeric()
        .trim(),
]