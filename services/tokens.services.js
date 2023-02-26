const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

const Token = require('../models/token.model');

exports.generateAccessToken = (username) => {
  return jwt.sign({ data: username }, TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

exports.getToken = async (body, next) => {
  const token = await Token.findOne({ token: body });
  return next(null, token);
};
