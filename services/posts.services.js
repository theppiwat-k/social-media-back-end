const Post = require('../models/post.model');

module.exports.postStatus = async ({ author, message }, next) => {
    try {
        const post = await new Post({
            message: message,
            author: author,
        });
        await post.save();
        return next(null, post);
    } catch (error) {
        return next(error.message);
    }
};

module.exports.getStatus = async (req, next) => {
    try {
        await Post.find()
            .populate('author', 'username avatar')
            .sort({date:-1})
            .select({ message: 1, date: 1 })
            .exec((err, posts) => {
                if (err) {
                    throw new Error(err);
                }
                return next(null, posts);
            });
    } catch (error) {
        return next(error.message);
    }
};
