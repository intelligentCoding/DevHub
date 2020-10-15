//we are creating user schema

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, //Email has to be unique so we don't get two users with one email.
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now, //we need the date to be set automatically.
  },
});

module.exports = User = mongoose.model("user", UserSchema);
