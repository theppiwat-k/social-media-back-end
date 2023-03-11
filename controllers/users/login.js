const { login } = require('../../services/users.services');

module.exports.loginController = async (req, res, next) => {
  await login(req.body, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: 'Success',
      data: results,
    });
  });
};
