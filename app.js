// req:request
// res : resultat
// status(200):pour les requte post create
//patch juste les champs modifier à envoyer mais put tout l'objet avec les champs modifié et non modifié
//mongose connect between js et mongodb
const express = require("express");

const mongoose = require("mongoose");

const TaskRoutes = require("./routes/task");
const UserRoutes = require("./routes/user");
const AuteurRoutes = require("./routes/auteur");
const BookRoutes = require("./routes/book");
const EventRoutes=require("./routes/event");
//sur mongo cloud
// mongoose.connect("mongodb+srv://ghofranemanai2019:Lovotech2022$$@cluster0.uyo0imf.mongodb.net/?retryWrites=true&w=majority/testnode",{
//   useNewUrlParser: true , useUnifiedTopology:true }
// ).then(() => console.log("connexion a MongoDB reussie!"))
// .catch((e) => console.log("connexion a MongoDB échouée!",e))

//sur mongo local
mongoose
  .connect("mongodb://localhost:27017/ExerciceNode", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connexion a MongoDB reussie!"))
  .catch((e) => console.log("connexion a MongoDB échouée!", e));

const app = express();
// app.use((req,res, next) => {
//     console.log("recu")
//     next()
// })
// app.use((req,res, next) => {
//        res.status(205)
//        next()
// })
// app.use((req,res, next) => {
//     res.json({message:"votre requete a bien été recu ! "})
//     next()
// })
// app.use((req,res) => {
//     console.log("REPONSE ENVOYE AVEC SUCCEE")
// })
app.use(express.json()); //pour que les données de post se mettent dans le body et va afficher le contenu de body sous forme json
// app.get("/api/tasks", (req, res, next) => {
//     const todos = [
//       { _id: "1", title: "learn js", duration: "30" },
//       { _id: "2", title: "learn nodejs", duration: "40" },
//       { _id: "3", title: "learn react", duration: "50" },
//     ];
//     res.status(200).json(todos);
//   });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Heders",
    "Origin,X-Requsted-With,Content,Accept,Content-Type,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use("/api/tasks", TaskRoutes);
app.use("/api/auteur", AuteurRoutes);
app.use("/api/book", BookRoutes);
app.use("/api/auth", UserRoutes);
app.use("/api/event", EventRoutes);

module.exports = app;
