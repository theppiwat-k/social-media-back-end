const bcrypt = require('bcryptjs');
const tokenService = require('./tokens.services');

const User = require('../models/user.model');
const Token = require('../models/token.model');

exports.login = async ({ username, password }, next) => {
  const user = await User.findOne({ username });
  if (user != null) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = tokenService.generateAccessToken(username);
      const newtoken = await new Token({
        token: token,
        active: true,
      });
      newtoken
        .save()
        .then(() => {
          return next(null, { ...user.toJSON(), token });
        })
        .catch((err) => {
          return next({
            message: err,
          });
        });
    } else {
      return next({
        message: 'Invalid Username/Password!',
      });
    }
  } else {
    return next({
      message: 'Invalid Username/Password!',
    });
  }
};

exports.logout = async (body, next) => {
  const token = await Token.findOne({ token: body });
  token.active = false;
  token
    .save()
    .then((response) => {
      return next(null, response);
    })
    .catch((err) => {
      return next({
        message: err,
      });
    });
};

exports.getUserProfile = async (username, next) => {
  const user = await User.findOne({ username });
  if (user != null) {
    return next(null, { ...user.toJSON() });
  } else {
    return next({
      message: 'Invalid Username/Password!',
    });
  }
};

exports.register = async (params, next) => {
  if (params.username === undefined) {
    return next(
      {
        message: 'Username Required',
      },
      ''
    );
  }

  const user = new User(params);
  user
    .save()
    .then((response) => {
      return next(null, response);
    })
    .catch((error) => {
      return next(error);
    });
};
