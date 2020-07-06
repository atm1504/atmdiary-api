const path = require('path');
const express = require('express');
const { body, check } = require('express-validator');
const router = express.Router();
const userController = require('./../controllers/user.js');
const userMiddleWare = require("./../middleware/user");
const User = require("./../models/user");

module.exports = router.post(
	'/signup',
	userMiddleWare.postSignupValidationCheck,
	userController.postSignup
);
