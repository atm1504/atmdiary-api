const mongoose = require('mongoose');
const path = require("path");
const util = require('../utilities/util');
const { validationResult, body, header } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User } = require("../models/user");
const randtoken = require('rand-token');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/config');

getToken= (email,token) => {
    return JWT.sign({
        atm: 'atm1504',
        email: email,
        token:token,
        iat:  Date.now(),
        exp:  Date.now() + 3600000
}, JWT_SECRET)
}

const HOST = "127.0.0.1:3000";

exports.postSignup = (req, res, next) => {
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
    let token;
    var rtoken = randtoken.generate(16);
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
                    token = getToken(email, rtoken)
                    const user = User({ name: name, email: email, password: hashedPassword, gender: gender, creation_time: ctime, active: 0, resetTokenExpiration: ctime + 3600000, resetToken: rtoken });
                    return user.save();
                }).then(result => {
                    var body = '<h1>Successfully created your account.</h1><br><h4>Click here to activate your account <a href="http://' + HOST + '/auth/activate?token=' + token + '">link</a> </h4>';
                    var t = util.send_email(email, body, "ATMDIARY account activation link", "info@atmdiary.com");
                    return t;
                })
                .then(result => {
                    return res.status(202).json({
                        status: "202",
                        message: ["Registration successful. Please verify your email to activate your account."]
                    });
                }).catch(err => {
                    console.log(err);
                    return res.status(500).json({
                        status: "500",
                        message: ["Server error occurred. Please try again after sometime."]
                    });
                });
        })
}

accessToken = (user,rtoken) => {
    return JWT.sign({
        atm: 'atm1504',
        id: user.id,
        token:rtoken,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 10)
    }, JWT_SECRET)
}

exports.postSignin = async (req, res, next) => {
    const user = req.user;
    var rtoken = randtoken.generate(16);
    const token = accessToken(user, rtoken);
    user.accessToken = rtoken;
    await user.save();
    return res.status(200).json({
        status: 200,
        token: token,
        user: user
    });
}

exports.getActivateAccount = async (req, res, next) => {
    const user = req.user;
    if (user.active == 1) {
        return res.status(400).json({
            message: 'Account already verified!',
            status: 400
        })
    }
    user.active = 1
    user.resetToken = "";
    await user.save();
    var body = '<h1>Successfully verified your email! Enjoy using atmdiary!</h1>';
    var t = await util.send_email(user.email, body, "ATMDIARY Account Verified", "info@atmdiary.com");
    return res.status(200).json({
        message: "User email " +user.email+" successfully verified!",
        status: 200
    })
}