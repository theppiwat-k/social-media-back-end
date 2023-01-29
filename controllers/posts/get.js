const postServices = require("../../services/posts.services");

exports.getStatus = async (req, res, next) => {
    await postServices.getStatus(req.body, (error, results) => {
      if (error) {
        return res.status(400).send({ message: error });
      }
      return res.status(200).send({ message: "Success", data: results });
    });
  };
  