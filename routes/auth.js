const path = require('path');
const express = require('express');
const { body, check } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth.js');
const authMiddleWare = require("../middleware/auth");
const { User } = require("../models/user");
const passport = require('passport');
const passportConf=require('./../passport');

module.exports = router.post(
	'/register',
	authMiddleWare.postSignupValidationCheck,
	authController.postSignup
);

module.exports = router.post(
	"/login",
	authMiddleWare.postSigninValidationCheck,
	passport.authenticate('signin', { session: false }),
	authController.postSignin
);
module.exports = router.get(
	"/activate",
	authMiddleWare.activateAccountValidationCheck,
	passport.authenticate('resetToken', { session: false }),
	authController.getActivateAccount
);
