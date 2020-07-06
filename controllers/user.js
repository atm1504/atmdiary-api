const mongoose = require('mongoose');
const path = require("path");
const util = require('../utilities/util');
const { validationResult, body, header } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const { has } = require('config');
const randtoken = require('rand-token');
const { getMaxListeners } = require('../models/user');

exports.postSignup = (req, res, net) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({
            status:403,
            message: errors.array()
        });
    }
    var token = randtoken.generate(16);
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.status(403).json({
                    status: 403,
                    message: ["Email id already in use. Use a different email id."]
                });
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    ctime = Date.now();
                    const user = User({ name: name, email: email, password: hashedPassword, gender: gender, creation_time: ctime, active: 0, resetTokenExpiration: ctime + 3600000, resetToken: token });
                    return user.save();
                }).then(result => {
                    var body = '<h1>Successfully created your account.</h1><br><h4>Click here to activate your account <a href="http://localhost:3000/user/activate?token=${token}&email=${email}">link</a> </h4>';
                    var t = util.send_email(email, body, "ATMDIARY account activation link", "info@atmdiary.com");
                    return t;
                })
                .then(result => {
                    return res.status(202).json({
                        status: "202",
                        message: ["Registration successful. Please verify your email to activate your account."]
                    });
                }).catch(err => {
                    return res.status(500).json({
                        status: "500",
                        message: ["Server error occurred. Please try again after sometime."]
                    });
                });
        })
}