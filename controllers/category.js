const Category = require("../models/category");
const addCategory = (req, res) => {
    const category = new Category(req.body);
    category
      .save()
      .then(() => {
        res.status(201).json({
          models: category,
          message: "category cree!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Donnee invalides",
        });
      });
  };


  module.exports = {
    addCategory: addCategory
  };
  