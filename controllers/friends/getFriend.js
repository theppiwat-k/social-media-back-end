const { getFriend } = require('../../services/friends.services');

module.exports.getFriendController = async (req, res) => {
    await getFriend(req.query, (error, results) => {
        if (error) {
            return res.status(400).send({ message: error });
        }
        return res.status(200).send({ message: 'Success', data: results });
    });
};
