const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken.js");

const registerUser = async (req, res) => {
  try {
    let { fullname, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) return res.status(401).send("User already registered");

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) res.send(err.message);
        let newUser = await userModel.create({
          fullname,
          email,
          password: hash,
        });

        let token = generateToken(newUser);
        res.cookie("token", token).send(newUser);
      });
    });
  } catch (err) {
    res.send("Somwthing went wrong");
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    req.flash("error", "Email or password Incorrect");
    return res.redirect("/");
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) {
      req.flash("error", "Email or password Incorrect");
      return res.redirect("/");
    }
    let token = generateToken(user);
    res.cookie("token", token).send("Login Success");
  });
};

module.exports = {
  registerUser,
  loginUser,
};
