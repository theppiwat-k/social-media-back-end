const bcrypt = require("bcryptjs");
const userServices = require("../services/users.services");
const tokenServices = require("../services/tokens.services");

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

exports.authenticateToken = (req, res, next) => {
  return res.status(200).json({ message: "Authorized User!!" });
};
