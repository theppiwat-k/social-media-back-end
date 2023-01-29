const bcrypt = require("bcryptjs");
const userServices = require("../../services/users.services");

exports.register = (req, res, next) => {
    const { password } = req.body;
  
    const salt = bcrypt.genSaltSync(10);
  
    req.body.password = bcrypt.hashSync(password, salt);
  
    userServices.register(req.body, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    });
  };