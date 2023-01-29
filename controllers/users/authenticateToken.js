exports.authenticateToken = (req, res, next) => {
  return res.status(200).json({ message: "Authorized User!!" });
};
