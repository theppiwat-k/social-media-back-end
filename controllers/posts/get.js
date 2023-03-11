const { getStatus } = require('../../services/posts.services');

module.exports.getStatusController = async (req, res, next) => {
  await getStatus(req.body, (error, results) => {
    if (error) {
      return res.status(400).send({ message: error });
    }
    return res.status(200).send({ message: 'Success', data: results });
  });
};
