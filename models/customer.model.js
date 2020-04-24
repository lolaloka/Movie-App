const mongoose = require('mongoose')
const Joi = require('joi')
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25
  },
  isGold: {
    type: Boolean
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    trim: true
  }
})
const Customer = mongoose.model('Customer', customerSchema)
function validationCustomer (customer) {
  const customerDetails = {
    name: Joi.string()
      .required()
      .min(5)
      .max(15),
    isGold: Joi.boolean(),
    phone: Joi.string()
      .required()
      .min(5)
      .max(15)
      .trim()
  }
  return Joi.validate(customer, customerDetails)
}
exports.Customer = Customer
exports.validate = validationCustomer
