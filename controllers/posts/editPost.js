const { editPost } = require('../../services/posts.services');

module.exports.editPostController = async (req, res, next) => {
    editPost(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Success',
            data: results,
        });
    });
};
