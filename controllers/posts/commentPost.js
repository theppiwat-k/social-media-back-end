const { commentPost } = require('../../services/posts.services');

module.exports.commentPostController = async (req, res) => {
    await commentPost(req.body, (error, results) => {
        if (error) {
            return res.status(400).send({ message: error });
        }
        return res.status(200).send({ message: 'Success', data: results });
    });
};
