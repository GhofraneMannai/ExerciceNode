const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event");

router.post("/" ,EventController.addEvent);

module.exports = router;