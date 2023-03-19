const { accecptNewFriendRequest } = require('../../services/friends.services');

module.exports.accecptFriendRequestController = async (req, res) => {
  await accecptNewFriendRequest(req.body, (error, results) => {
    if (error) {
      return res.status(400).send({ message: error });
    }
    return res.status(200).send({ message: 'Success', data: results });
  });
};
