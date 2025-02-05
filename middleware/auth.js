const { check, body, query, oneOf, validationResult } = require('express-validator/check');
const { User } = require("../models/user");


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
        }),
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
                return Promise.reject("E-Mail doesn't exist. Register first");
            });
        }),
    body('password', 'Please enter a password with only numbers and text and at least 5 characters.')
        .isLength({
            min: 5
        })
        .isAlphanumeric()
        .trim(),
]

exports.activateAccountValidationCheck = [
    check("token")
        .isLength({ min: 5 }).withMessage("Activation token not set")
]

exports.changePasswordValidationCheck = [
    body('password', 'Please enter a password with only numbers and text and at least 5 characters.')
        .isLength({
            min: 5
        })
        .isAlphanumeric()
        .trim(),
    body('confirmPassword').trim().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password fields didn't match!");
        }
        return true;
    }),
]

// CHeck if email is set or not
exports.forgotPasswordValidationCheck = [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
            val = value.toString();
            return User.findOne({ email: val }).then((userDoc) => {
                if (userDoc) {
                    return true;
                }
                return Promise.reject("E-Mail doesn't exist. Register first!");
            });
        })
]

exports.forgotPasswordOTPValiodationCheck = [
        check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
            val = value.toString();
            return User.findOne({ email: val }).then((userDoc) => {
                if (userDoc) {
                    return true;
                }
                return Promise.reject("E-Mail doesn't exist. Register first!");
            });
        }),
    check("otp")
        .isLength({ min: 6, max: 6 })
        .withMessage("Enter a valid otp")
]