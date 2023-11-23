const Eventt = require("../models/event");
const addEvent = async (req, res) => {
    const event = new Eventt(req.body);
    try{
    const event1= await event.save()
        res.status(201).json({
          models: event1,
          message: "event cree!",
        });
      }
      catch(error){
        res.status(400).json({
          error: error.message,
          message: "Donnee invalides",
        });
       }
  };

  module.exports = {
    addEvent: addEvent,
  };

