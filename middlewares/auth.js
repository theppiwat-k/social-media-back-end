const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  } else {
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      return next();
    });
  }
};


this.authenticateToken.unless = require('express-unless');
