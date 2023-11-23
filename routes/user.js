const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth=require('../middlewares/auth')
const UserController = require("../controllers/user");

router.post("/signup",auth.validateSignupData,UserController.signup)
router.post("/login",UserController.login)

module.exports = router;