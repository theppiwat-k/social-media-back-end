const { newFriendRequest,getNewFriendRequest} = require('../../services/friends.services');

module.exports.sendRequestController = async (req, res) => {
  await newFriendRequest(req.body, (error, results) => {
    if (error) {
      return res.status(400).send({ message: error });
    }
    return res.status(200).send({ message: 'Success', data: results });
  });
};

module.exports.getNewFriendRequestController = async (req, res) => {
  await getNewFriendRequest(req.query, (error, results) => {
    if (error) {
      return res.status(400).send({ message: error });
    }
    return res.status(200).send({ message: 'Success', data: results });
  });
};
