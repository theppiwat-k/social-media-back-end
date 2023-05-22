const { getPost } = require('../../services/posts.services');

module.exports.getPostController = async (req, res) => {
    await getPost(req.body, (error, results) => {
        if (error) {
            return res.status(400).send({ message: error });
        }
        return res.status(200).send({ message: 'Success', data: results });
    });
};
