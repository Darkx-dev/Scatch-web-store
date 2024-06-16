const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedin.js");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index.ejs", { error });
});

router.get("/shop", isLoggedIn, (req, res) => {
  res.render("shop.ejs");
});

module.exports = router;
