const { getUserProfile } = require('../../services/users.services');

module.exports.userProfileController = (req, res, next) => {
  const username = req.body.username;
  getUserProfile(username, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: 'Success',
      data: results,
    });
  });
};
