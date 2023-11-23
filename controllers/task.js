const Task = require("../models/Task");

// const fetchTasks = (req, res) => {
//   //  console.log(req.params.duration)
//   //  res.send(req.params.duration)
//   Task.find().then((tasks) => {
//     res
//       .status(200)
//       .json({
//         model: tasks,
//         message: "success",
//       })
//       .catch((error) => ({
//         error: error.message,
//         message: "probleme d'extraction",
//       }));
//   });
// };

const fetchTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      model: tasks,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "problème d'extraction",
    });
  }
};


// const addTask = (req, res) => {
//   const task = new Task(req.body);
//   task
//     .save()
//     .then(() => {
//       res.status(201).json({
//         models: task,
//         message: "object cree!",
//       });
//     })
//     //.then ou await task.save()
//     .catch((error) => {
//       res.status(400).json({
//         error: error.message,
//         message: "Donnee invalides",
//       });
//     });
// };

const addTask = async (req, res) => {
  const task = new Task(req.body);
  try{
  const taskn= await task.save()
      res.status(201).json({
        models: taskn,
        message: "object cree!",
      });
    }
    //.then ou await task.save()
    catch(error){
      res.status(400).json({
        error: error.message,
        message: "Donnee invalides",
      });
     }
};


// const getTaskByid = (req, res) => {
//   // console.log(req.params.id);
//   // res.send(req.params.id);
//   Task.findOne({ _id: req.params.id })
//     .then((task) => {
//       if (!task) {
//         res.status(404).json({
//           message: "objet non trouvé!",
//         });
//       } else {
//         res.status(200).json({
//           model: task,
//           message: "objet trouvé!",
//         });
//       }
//     })
//     .catch(() => {
//       res.status(400).json({
//         error: Error.message,
//         message: "Données invalides!",
//       });
//     });
// };

const getTaskByid = async (req, res) => {
  // console.log(req.params.id);
  // res.send(req.params.id);
  try{
  const task = await Task.findOne({ _id: req.params.id })
      if (!task) {
        res.status(404).json({
          message: "objet non trouvé!",
        });
      } else {
        res.status(200).json({
          model: task,
          message: "objet trouvé!",
        });
      }
    }
     catch(error){
      res.status(400).json({
        error: error.message,
        message: "Donnee invalides",
      });
     }
};






const updateTask = (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);
  // res.send(req.body);

  Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    (task) => {
      if (!task) {
        res.status(404).json({
          message: "objet non trouvé!",
        });
      } else {
        res.status(200).json({
          model: task,
          message: "objet modifié!",
        });
      }
    }
  );
};

const deleteTask = (req, res) => {
  console.log(req.params.id);
  res.send("delete");
};

const deleteTaskByid = async (req, res) => {
  // console.log(req.params.id);
  // res.send(req.body);*
  try{
  const tasks = await Task.deleteOne({ _id: req.params.id })
  
      res.status(200).json({
        message: "success!",
      })
   
}
catch(error){
  res.status(400).json({
    error: error.message,
    message: "Donnee invalides",
  });
 }
};

module.exports = {
  fetchTasks: fetchTasks,
  addTask: addTask,
  getTaskByid: getTaskByid,
  updateTask: updateTask,
  deleteTask: deleteTask,
  deleteTaskByid: deleteTaskByid,
};
