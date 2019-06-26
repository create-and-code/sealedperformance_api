const Joi = require("joi");
const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    user: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50
        }
      }),
      required: true
    },
    products: {
      type: Array,
      required: true
    },
    orderDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    total: {
      type: Number,
      min: 0
    }
  })
);

function validateOrder(order) {
  const schema = {
    userId: Joi.objectId().required(),
    products: Joi.array().required(),
    total: Joi.number()
      .min(0)
      .required()
  };

  return Joi.validate(order, schema);
}

exports.Order = Order;
exports.validateOrder = validateOrder;
