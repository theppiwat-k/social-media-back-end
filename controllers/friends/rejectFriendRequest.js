const { rejectNewFriendRequest } = require('../../services/friends.services');

module.exports.rejectFriendRequestController = async (req, res) => {
    await rejectNewFriendRequest(req.body, (error, results) => {
        if (error) {
            return res.status(400).send({ message: error });
        }
        return res.status(200).send({ message: 'Success', data: results });
    });
};
