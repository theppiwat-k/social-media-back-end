const userServices = require('../../services/users.services');

module.exports.login = async (req, res, next) => {
  await userServices.login(req.body, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: 'Success',
      data: results,
    });
  });
};
