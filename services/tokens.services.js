const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

const Token = require('../models/token.model');

module.exports.generateAccessToken = ({_id,username,email}) => {
    return jwt.sign({ id: _id,username: username,email: email,}, TOKEN_SECRET, {
        expiresIn: '1h',
    });
};

module.exports.getToken = async (body, next) => {
    const token = await Token.findOne({ token: body });
    return next(null, token);
};
