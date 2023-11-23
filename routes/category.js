const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category");

router.post("/" ,CategoryController.addCategory);

module.exports = router;