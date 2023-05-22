const { getCommentByOne } = require('../../services/posts.services');

module.exports.getCommentByOneController = async (req, res) => {
    const postId = req.params.id;
    await getCommentByOne(postId, (error, results) => {
        if (error) {
            return res.status(400).send({ message: error });
        }
        return res.status(200).send({ message: 'Success', data: results });
    });
};
