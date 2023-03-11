const { postStatus } = require('../../services/posts.services');

module.exports.postStatusController = async (req, res, next) => {
  await postStatus(req.body, (error, results) => {
    if (error) {
      return res.status(400).send({ message: error });
    }
    return res.status(200).send({ message: 'Success', data: results });
  });
};
