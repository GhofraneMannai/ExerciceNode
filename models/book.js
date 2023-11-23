const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const author = require("./auteur")
const categories = require("./category")

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  ISBN: { type: String, required: false },
  description: { type: String, required: false },
  date_of_publication: { type: Date, required: false },
  number_page: { type: Number, required: false },
  language: { type: String, required: false },
  auteur: { type: mongoose.Schema.Types.ObjectId, ref: author },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: categories }],
}, {
  timestamps: true // Cette option doit être passée en tant que deuxième argument
});

// Ajoutez le plugin mongoose-id-validator au schéma
bookSchema.plugin(idValidator);
// Méthode statique pour trouver tous les livres d'un auteur donné
bookSchema.statics.findByAuthor = function (author) {
  return this.find({ auteur: author });
};

module.exports = mongoose.model("Book", bookSchema);
