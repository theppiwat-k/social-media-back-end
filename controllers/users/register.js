const bcrypt = require('bcryptjs');
const userServices = require('../../services/users.services');

module.exports.register = async (req, res, next) => {
  const { password } = req.body;

  const salt = await bcrypt.genSaltSync(10);

  req.body.password = await bcrypt.hashSync(password, salt);

  userServices.register(req.body, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: 'Success',
      data: results,
    });
  });
};
