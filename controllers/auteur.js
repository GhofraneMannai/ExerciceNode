const Auteurs = require("../models/auteur");

const fetchAuteur = (req, res) => {
    Auteurs.find().then((Auteur) => {
    res
      .status(200)
      .json({
        model: Auteur,
        message: "success",
      })
      .catch((error) => ({
        error: error.message,
        message: "probleme d'extraction",
      }));
  });
};
const addAuteur = (req, res) => {
  const auteur = new Auteurs(req.body);
  auteur
    .save()
    .then(() => {
      res.status(201).json({
        models: auteur,
        message: "auteur cree!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "Donnee invalides",
      });
    });
};

const getAuteurByid = (req, res) => {
  Auteurs.findOne({ _id: req.params.id })
    .then((auteur) => {
      if (!auteur) {
        res.status(404).json({
          message: "auteur non trouvé!",
        });
      } else {
        res.status(200).json({
          model: auteur,
          message: "auteur trouvé!",
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
};

const updateAuteur = (req, res) => {
  Auteurs.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    (auteur) => {
      if (!auteur) {
        res.status(404).json({
          message: "auteur non trouvé!",
        });
      } else {
        res.status(200).json({
          model: auteur,
          message: "auteur modifié!",
        });
      }
    }
  );
};

const deleteAuteur = (req, res) => {
  console.log(req.params.id);
  res.send("delete");
};

const deleteAuteurByid = (req, res) => {
  Auteurs.deleteOne({ _id: req.params.id })
    .then((auteur) =>
      res.status(200).json({
        message: "success!",
      })
    )
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "probleme d'extraction ",
      });
    });
};

module.exports = {
  fetchAuteur: fetchAuteur,
  addAuteur: addAuteur,
  getAuteurByid: getAuteurByid,
  updateAuteur: updateAuteur,
  deleteAuteur: deleteAuteur,
  deleteAuteurByid: deleteAuteurByid,
};
