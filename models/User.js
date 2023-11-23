const mongoose = require("mongoose");
//creer _id de type objectid avec Schema
const validRoles = ['admin', 'user'];
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
  firstname:{ type: String, required: false },
  lastname:{ type: String, required: false},
  role:{ type: String, required: true  , enum: validRoles },
  email: { type: String, required: true , unique: true },
  password: { type: String, required: true },
});
userSchema.plugin(uniqueValidator);
userSchema.virtual('name').get(function(){
return this.firstname + ' ' + this.lastname ;
});



// Méthode pour transformer l'objet User en objet public
userSchema.methods.toPublic = function () {
  const userObject = this.toObject(); // Convertit le document Mongoose en objet JavaScript

// Supprime le champ de mot de passe
delete userObject.password;
// Ajoute le champ name
userObject.Name = this.name;
return userObject;
};

module.exports = mongoose.model("User", userSchema);