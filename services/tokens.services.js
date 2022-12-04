const Token = require("../models/token.model");

async function token(token, active, callback) {
  const newtoken = await new Token({
    token: token,
    active: active,
  });
  newtoken
    .save()
    .then(() => {})
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  token,
};
