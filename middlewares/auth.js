const jwt = require("jsonwebtoken");
const UserModels = require("../models/User");
const Joi = require('joi');


module.exports.loggedMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    UserModels.findOne({_id:userId})
      .then((UserModel) => {
        if (!UserModel) {
          res.status(404).json({
            message: "User non trouvé!",
          });
          
        } else {
          req.auth = {
            userId: userId,
            role:UserModel.role
          };
          next();
        }
      })
      .catch(() => {
        res.status(400).json({
          error: Error.message,
          message: "Données inva!ide",
        });
      });


  } catch (error) {
    res.status(401).json({ error:error.message });
  }
};


module.exports.isadmin = (req, res, next) => {
try{
    if(req.auth.role === "admin")
    {
      next();}
      else {
        res.status(403).json({ error:"no access to this route" });
      }
    
}

catch(e)
{
  res.status(401).json({ e:e.message });

}

};

const validRoles = ['admin', 'user'];
// Middleware de validation avec Joi
module.exports.validateSignupData = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    role: Joi.string().valid(...validRoles).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};


