const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middlewares/auth");
const TaskController = require("../controllers/task");
//find tout
router.get("/",auth.loggedMiddleware , auth.isadmin, TaskController.fetchTasks);

//find by id
router.get("/:id",auth.loggedMiddleware ,TaskController.getTaskByid);

router.post("/",auth.loggedMiddleware ,TaskController.addTask);

// router.patch("/:id",(req,res)=>{
//  console.log(req.body)
//  console.log(req.params.id)
//  res.send(req.body)
// });
router.patch("/:id",auth.loggedMiddleware ,TaskController.updateTask);

router.delete("/:id",auth.loggedMiddleware ,TaskController.deleteTask);

router.delete("/delete/:id",auth.loggedMiddleware ,TaskController.deleteTaskByid);

module.exports = router;
