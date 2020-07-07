const path = require('path');
const express = require('express');
const { body, check } = require('express-validator');
const router = express.Router();
const userController = require('./../controllers/user.js');
const userMiddleWare = require("./../middleware/user");
const { User } = require("./../models/user");
const passport = require('passport');
const passportConf=require('./../passport');

module.exports = router.post(
	'/signup',
	userMiddleWare.postSignupValidationCheck,
	userController.postSignup
);

module.exports = router.post("/signin", userMiddleWare.postSigninValidationCheck, passport.authenticate('local', { session: false }), userController.postSignin);