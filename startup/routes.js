const express = require("express");
const bodyParser = require("body-parser");
const categories = require("../routes/categories");
const products = require("../routes/products");
const users = require("../routes/users");
const auth = require("../routes/auth");
const mail = require("../routes/mail");
const error = require("../middleware/error");
const cors = require("cors");

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/api/categories", categories);
  app.use("/api/products", products);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/mail", mail);
  app.use(error);
};
