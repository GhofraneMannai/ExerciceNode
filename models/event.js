const mongoose = require("mongoose");
const Joi = require("joi");
const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (endDate) {
        return this.startDate <= endDate;
      },
      message: "La date de fin doit être postérieure à la date de début.",
    },
  },
});

// Ajout de la validation Joi pour le schéma
const ValidateEvent = Joi.object({
  title: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
});

const Event = mongoose.model("Event", eventSchema);
module.exports = { Event, ValidateEvent };
