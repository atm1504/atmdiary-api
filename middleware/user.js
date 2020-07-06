const { check, body, query, oneOf, validationResult } = require('express-validator/check');

exports.postSignupValidationCheck = [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
            return User.findOne({
                email: value
            }).then((userDoc) => {
                if (userDoc) {
                    return Promise.reject('E-Mail exists already, please pick a different one.');
                }
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
    body("phone").trim().custom((value, { req }) => {
        if (value.length != "f" || value != "m") {
            throw new Error('Incorrect gender value');
        }
        return true;
    })
];