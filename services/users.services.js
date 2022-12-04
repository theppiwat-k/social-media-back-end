const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth.js");
const Token = require("../models/token.model");

const crypto = require("crypto");
const { response } = require("express");
const key = "verysecretkey"; // Key for cryptograpy. Keep it secret

async function login({ username, password }, callback) {
  const user = await User.findOne({ username });

  if (user != null) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = auth.generateAccessToken(username);
      // call toJSON method applied during model instantiation
      const newtoken = await new Token({
        token: token,
        active: true,
      });
      newtoken
        .save()
        .then((reponse) => {
          console.log(reponse);
        })
        .catch((err) => {
          console.log(err);
        });
      return callback(null, { ...user.toJSON(), token });
    } else {
      return callback({
        message: "Invalid Username/Password!",
      });
    }
  } else {
    return callback({
      message: "Invalid Username/Password!",
    });
  }
}

async function logout({ username, password }, callback) {
  const user = await User.findOne({ username });

  if (user != null) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = "";
      // call toJSON method applied during model instantiation
      return callback(null, { ...user.toJSON(), token });
    } else {
      return callback({
        message: "Invalid Username/Password!",
      });
    }
  } else {
    return callback({
      message: "Invalid Username/Password!",
    });
  }
}

async function getUserProfile(username, callback) {
  const user = await User.findOne({ username });
  if (user != null) {
    return callback(null, { ...user.toJSON() });
  } else {
    return callback({
      message: "Invalid Username/Password!",
    });
  }
}

async function register(params, callback) {
  if (params.username === undefined) {
    return callback(
      {
        message: "Username Required",
      },
      ""
    );
  }

  const user = new User(params);
  user
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  login,
  logout,
  register,
  getUserProfile,
};
