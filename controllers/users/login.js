const userServices = require("../../services/users.services");

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    await userServices.login({ username, password }, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    });
  };