const path = require('path');
const express = require('express');
const { body, check } = require('express-validator');
const router = express.Router();
const userController = require('./../controllers/user.js');
const userMiddleWare = require("./../middleware/user");

module.exports = router.get(
	'/signup',
	userMiddleWare.postSignupValidationCheck,
	userController.signup
);
