const userServices = require("../../services/users.services");

exports.userProfile = (req, res, next) => {
    const username = req.body.username;
    userServices.getUserProfile(username, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    });
  };
  