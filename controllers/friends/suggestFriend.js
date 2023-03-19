const { getSuggestFriend } = require('../../services/friends.services');

module.exports.getSuggestFriendController = async (req, res) => {
  await getSuggestFriend(req.query, (error, results) => {
    if (error) {
      return res.status(400).send({ message: error });
    }
    return res.status(200).send({ message: 'Success', data: results });
  });
};
