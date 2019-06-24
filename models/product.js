const Joi = require("Joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  category: {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    }
  },
  numberInStock: {
    type: Number,
    required: true,
    minlength: 0,
    maxlength: 255
  },
  price: {
    type: Number,
    required: true,
    minlength: 2,
    maxlength: 150
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  images: {
    type: Array,
    required: true
  }
});

const Product = mongoose.model("Product", ProductSchema);

function validateProduct(product) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    categoryId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(0)
      .max(255)
      .required(),
    price: Joi.number()
      .min(2)
      .max(150)
      .required(),
    description: Joi.string()
      .min(5)
      .max(255)
      .required(),
    images: Joi.array().required()
  };
  return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validateProduct = validateProduct;
