const { newFriendRequest } = require("../../services/request.services");

module.exports.friendRequestController = async (req, res) => {
    
  await newFriendRequest(req.body, (error, results) => {
    if (error) {
      return res.status(400).send({ message: error });
    }
    return res.status(200).send({ message: 'Success', data: results });
  });

};
