const bcrypt = require('bcryptjs');
const tokenService = require('./tokens.services');
const crypto = require('crypto');
const Token = require('../models/token.model');
const sendMail = require('../utils/sendMail');

const User = require('../models/user.model');

module.exports.login = async ({ email, password }, next) => {
  const user = await User.findOne({ email });
  if (user != null) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = tokenService.generateAccessToken(user);
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

module.exports.logout = async (body, next) => {
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

module.exports.getUserProfile = async (email, next) => {
  const user = await User.findOne({ email });
  if (user != null) {
    return next(null, { ...user.toJSON() });
  } else {
    return next({
      message: 'Invalid Username/Password!',
    });
  }
};

module.exports.register = async (params, next) => {
  if (params.username === undefined) {
    return next(
      {
        message: 'Username Required',
      },
      ''
    );
  }
  const validateKey = await crypto.randomBytes(32).toString('hex');
  const body = {
    email: params.email,
    password: params.password,
    username: params.email.split('@')[0],
    active: {
      validateKey: validateKey,
      date: Date.now(),
    },
  };
  const user = new User(body);
  await user
    .save()
    .then(async (response) => {
      await sendMail(response);
      return next(null, response);
    })
    .catch((error) => {
      return next(error);
    });
};

module.exports.activatedUser = async (params, next) => {
  const { email, validateKey } = params;
  const { active } = await User.findOne({ email });
  if (validateKey === active.validateKey) {
    await User.updateOne(
      { email: email },
      {
        active: {
          status: true,
        },
      }
    )
      .then((response) => {
        return next(null, response);
      })
      .catch((error) => {
        return next(error);
      });
  } else {
    return next(error);
  }
};

