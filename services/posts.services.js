const User = require("../models/user.model");
const Post = require("../models/post.model");

async function postStatus({ username, message }, callback) {
  try {
    const user = await User.findOne({ username });
    const post = await new Post({
      message: message,
      username: user.username,
      email: user.email,
      uid: user._id.toString(),
    });
    await post.save();
    return callback(null, post);
  } catch (error) {
    return callback(error.message);
  }
}

module.exports = {
  postStatus,
};
