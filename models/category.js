const Joi = require("Joi");
const mongoose = require("mongoose");

categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  image_src: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    image_src: Joi.string()
      .min(5)
      .max(50)
      .required()
  };
  return Joi.validate(category, schema);
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validateCategory = validateCategory;
