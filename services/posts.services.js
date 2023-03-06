const User = require('../models/user.model');
const Post = require('../models/post.model');

module.exports.postStatus = async ({ username, message }, next) => {
  try {
    const user = await User.findOne({ username });
    const post = await new Post({
      message: message,
      username: user.username,
      email: user.email,
      uid: user._id.toString(),
    });
    await post.save();
    return next(null, post);
  } catch (error) {
    return next(error.message);
  }
};

module.exports.getStatus = async ({}, next) => {
  try {
    const post = await Post.find();
    return next(null, post);
  } catch (error) {
    return next(error.message);
  }
};
