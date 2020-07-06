const path = require('path');
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require("./../controllers/user.js");

module.exports = router.get("/signup", userController.signup);
