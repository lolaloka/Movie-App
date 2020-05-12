const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25
  },
  password: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})
const User = mongoose.model('User', userSchema)
function userValidation (users) {
  const userValidators = {
    username: Joi.string()
      .required()
      .min(5)
      .max(15),
    password: Joi.string().required().min(6),
    displayName: Joi.string().required().max(10).min(3),
    email: Joi.string().required()
  }
  return Joi.validate(users, userValidators)
}

exports.User = User
exports.userValidation = userValidation
