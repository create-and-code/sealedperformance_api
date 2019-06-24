const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const { Category, validateCategory } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    name: req.body.name,
    image_src: req.body.image_src
  });
  await category.save();

  res.send(category);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category;
  try {
    category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, image_src: req.body.image_src },
      { new: true }
    );
  } catch (ex) {
    console.log(ex.message);
    return res
      .status(404)
      .send("The category with the given ID was not found.");
  }

  res.send(category);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  let category;
  try {
    category = await Category.findByIdAndDelete(req.params.id);
  } catch (ex) {
    console.log(ex.message);
    return res
      .status(404)
      .send("The category with the given ID was not found.");
  }

  res.send(category);
});

router.get("/:id", async (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.id));
  // res.status(404).send("Invalid ID.");

  let category;
  try {
    category = await Category.findById(req.params.id);
  } catch (ex) {
    return res
      .status(404)
      .send("The category with the given ID was not found.");
  }
  res.send(category);
});

module.exports = router;
