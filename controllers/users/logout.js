const userServices = require("../../services/users.services");

exports.logout = (req, res, next) => {
    const { username, password } = req.body;
  
    userServices.logout({ username, password }, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    });
  };