const Comment = require('../models/comment.model');
const Friend = require('../models/friend.model');
const Post = require('../models/post.model');

module.exports.postStatus = async ({ author, message }, next) => {
    try {
        const post = await new Post({
            message: message,
            author: author,
            date: Date.now(),
        });
        await post.save();
        return next(null, post);
    } catch (error) {
        return next(error.message);
    }
};

module.exports.getPost = async ({ id }, next) => {
    const userId = id;
    const friends = await Friend.find({
        $or: [{ requester: userId }, { recipient: userId }],
        $and: [{ $or: [{ status: 'accepted' }] }],
    }).sort({ date: -1 });
    const friendId = friends.map((friend) => {
        const requester = friend.requester.toString();
        const recipient = friend.recipient.toString();
        if (requester !== userId) {
            return requester;
        }
        if (recipient !== userId) {
            return recipient;
        }
    });
    try {
        await Post.find({ author: { $in: [userId, ...friendId] } })
            .populate('author', 'username avatar')
            .populate({
                path: 'commentofpost',
                select: 'message author createdAt -post', //specify the fields to select for commentinfo
                options: { sort: { createdAt: -1 } },
            })
            .sort({ date: -1 })
            .select({ message: 1, date: 1, commentofpost: 1, likes: 1 })
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

module.exports.getCommentByOne = async (postId, next) => {
    try {
        const post = await Post.findById(postId)
            .populate({
                path: 'commentofpost',
                select: 'message author createdAt -post', //specify the fields to select for commentinfo
                options: { sort: { createdAt: -1 } },
            })
            .select({ commentofpost: 1 });
        return next(null, post);
    } catch (error) {
        return next(error.message);
    }
};

module.exports.commentPost = async ({ message, author, postId }, next) => {
    try {
        const newComment = new Comment({
            message: message,
            author: author, // the user who wrote the comment
            post: postId, //  the post that the comment belongs to
        });
        newComment
            .save()
            .then((comment) => {
                Post.findOneAndUpdate(
                    { _id: postId },
                    { $push: { comments: comment._id } },
                    (err) => {
                        if (err) {
                            throw new Error(err);
                        } else {
                            return next(null, comment);
                        }
                    }
                );
            })
            .catch((error) => {
                throw new Error(error);
            });
    } catch (error) {
        return next(error.message);
    }
};

module.exports.likePost = async ({ postId, userId }, next) => {
    try {
        const post = await Post.findById(postId);
        // Check if the user has already liked the post
        const existingLike = post.likes.find(
            (like) => like.user.toString() === userId
        );
        if (existingLike) {
            return next(null, 'You have already liked this post');
        }
        // Add a new like to the post
        post.likes.push({ user: userId });
        await post.save();
        return next(null, 'Success');
    } catch (error) {
        return next(error.message);
    }
};

module.exports.editPost = async ({ postId, newMessage }, next) => {
    try {
        await Post.updateOne({ _id: postId }, { message: newMessage });
        return next(null, 'Success');
    } catch (error) {
        return next(error.message);
    }
};

module.exports.deletePost = async (postId, next) => {
    try {
        await Post.deleteOne({ _id: postId });
        return next(null, 'Success');
    } catch (error) {
        return next(error.message);
    }
};
