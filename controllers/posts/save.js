const { postStatus } = require('../../services/posts.services');

module.exports.saveStatus = async (req, res, next) => {
  await postStatus(req.body, (error, results) => {
    if (error) {
      return res.status(400).send({ message: error });
    }
    return res.status(200).send({ message: 'Success', data: results });
  });
};
