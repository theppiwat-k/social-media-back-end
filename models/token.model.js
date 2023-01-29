const mongoose = require("mongoose");
const { Schema } = mongoose;

const TokenSchema = new Schema({
  token: {
    type: String,
    require: true,
  },
  active: {
    type: Boolean,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

TokenSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject.id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


const Token = mongoose.model("token", TokenSchema);
module.exports = Token;