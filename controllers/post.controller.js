const postServices = require("../services/posts.services");
const User = require("../models/user.model");
const Post = require("../models/post.model");

exports.status = async (req, res, next) => {
  await postServices.postStatus(req.body, (error, results) => {
    if (error) {
      return res.status(400).send({ message: error });
    }
    return res.status(200).send({ message: "Success", data: results });
  });
  next();
};
