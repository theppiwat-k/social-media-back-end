const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const { TOKEN_SECRET } = process.env;
  if (!token) {
    return res.sendStatus(401);
  } else {
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      return next();
    });
  }
}

function generateAccessToken(username) {
  return jwt.sign({ data: username }, TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

authenticateToken.unless = require("express-unless");

module.exports = {
  authenticateToken,
  generateAccessToken,
};
