const mongoose = require("mongoose");
//creer _id de type objectid avec Schema
const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: false },
});

module.exports = mongoose.model("Task", taskSchema);
