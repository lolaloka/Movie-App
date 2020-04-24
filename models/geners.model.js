const mongoose = require("mongoose");
const Joi = require("joi");
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25
  }
});
const Genre = new mongoose.model("Genre", genreSchema);
function validationGener(generes) {
  const genreShape = {
    name: Joi.string()
      .required()
      .min(5)
      .max(15)
  };
  return Joi.validate(generes, genreShape);
}

exports.Genre = Genre;
exports.validate = validationGener;
