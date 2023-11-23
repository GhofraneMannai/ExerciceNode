const mongoose = require("mongoose");
const validTitle = ['Horror', 'Mystery'];
const categorySchema = mongoose.Schema({
    title: { type: String,required:true, enum: validTitle}
 })

module.exports = mongoose.model("Category", categorySchema);