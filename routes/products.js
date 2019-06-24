const auth = require("../middleware/auth");
const { Product, validateProduct } = require("../models/product");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().sort("name");
  res.send(products);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log(req.body.categoryId);

  const category = await Category.findById(req.body.categoryId);
  if (error) return res.status(400).send("Invalid category.");

  console.log(category);

  const product = new Product({
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name
    },
    numberInStock: req.body.numberInStock,
    price: req.body.price,
    description: req.body.description,
    images: req.body.images
  });
  await product.save();

  res.send(product);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (error) return res.status(400).send("Invalid genre.");

  let product;
  try {
    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: {
          _id: category.id,
          name: category.name
        },
        numberInStock: req.body.numberInStock,
        price: req.body.price,
        description: req.body.description,
        images: req.body.images
      },
      { new: true }
    );
  } catch (ex) {
    console.log(ex.message);
    return res.status(404).send("The product with the given ID was not found.");
  }

  res.send(product);
});

router.delete("/:id", auth, async (req, res) => {
  let product;
  try {
    product = await Product.findByIdAndDelete(req.params.id);
  } catch (ex) {
    console.log(ex.message);
    return res.status(404).send("The product with the given ID was not found.");
  }

  res.send(product);
});

router.get("/:id", async (req, res) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
  } catch (ex) {
    console.log(ex.message);
    return res.status(404).send("The product with the given ID was not found.");
  }
  res.send(product);
});

module.exports = router;
