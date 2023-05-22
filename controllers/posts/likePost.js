const { likePost } = require('../../services/posts.services');

module.exports.likePostController = async (req, res) => {
    await likePost(req.body, (error, results) => {
        if (error) {
            return res.status(400).send({ message: error });
        }
        return res.status(200).send({ message: 'Success', data: results });
    });
};
