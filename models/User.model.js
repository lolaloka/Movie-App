const mongoose = require("mongoose");
const Joi = require("joi");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
});
const User = new mongoose.model("User", userSchema);
function validator(user) {
  const userValidator = {
    username: Joi.string().required().min(5).max(25),
    email: Joi.string().required(),
    password: Joi.string().required().min(6).max(25),
    displayName: Joi.string(),
  };
  return Joi.validate(user, userValidator);
}

exports.User = User;
exports.validator = validator;
