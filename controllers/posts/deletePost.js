const { deletePost } = require('../../services/posts.services');

module.exports.deletePostController = async (req, res) => {
    const postId = req.params.id;
    await deletePost(postId, (error, results) => {
        if (error) {
            return res.status(400).send({ message: error });
        }
        return res.status(200).send({ message: 'Success', data: results });
    });
};
