const express = require("express");
const router = express.Router();
const auteur = require("../models/auteur");
const AuteurController = require("../controllers/auteur");
//find tout
router.get("/", AuteurController.fetchAuteur);

//find by id
router.get("/:id" ,AuteurController.getAuteurByid);

router.post("/" ,AuteurController.addAuteur);

router.patch("/:id" ,AuteurController.updateAuteur);

router.delete("/:id" ,AuteurController.deleteAuteur);

router.delete("/delete/:id" ,AuteurController.deleteAuteurByid);

module.exports = router;