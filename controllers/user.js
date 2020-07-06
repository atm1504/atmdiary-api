const mongoose = require('mongoose');
const path = require("path");
const util = require('../utilities/util');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require("../models/user");

exports.signup = (req, res, net) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword
      }
    });
  }

    return res.status(200).json({
                status: 202,
                message: "Success."})
}