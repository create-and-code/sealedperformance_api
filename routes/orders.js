const auth = require("../middleware/auth");
const { Order, validateOrder } = require("../models/order");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const Fawn = require("fawn");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const orders = await Order.find().sort("-dateOut");
  res.send(orders);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  //TODO

  //   const product = await Product.findById(req.body.productId);
  //   if (!product) return res.status(400).send("Invalid product.");

  //   if (product.numberInStock === 0)
  //     return res.status(400).send("Product not in stock.");

  let order = new Order({
    user: {
      _id: user._id,
      name: user.name
    },
    products: req.body.products,
    total: req.body.total
  });

  console.log(req.body.products);

  try {
    new Fawn.Task().save("orders", order).run();

    req.body.products.map(async p => {
      await Product.findByIdAndUpdate(p.id, {
        $inc: { numberInStock: -p.quantity }
      });
    });

    res.send(order);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

router.get("/:id", async (req, res) => {
  const order = await Order.find({ "user._id": req.params.id });

  if (!order) return res.status(404).send("No orders could be found.");

  res.send(order);
});

module.exports = router;
