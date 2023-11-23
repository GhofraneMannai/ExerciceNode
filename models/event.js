const mongoose = require("mongoose");
const Joi = require("joi");

const eventSchema = mongoose.Schema({
  title: Joi.string().required(),
  debutDate: Joi.date().iso().required(),
  finDate: Joi.date().iso().min(Joi.ref("debutDate")).required(),
});

module.exports = mongoose.model("event", eventSchema);