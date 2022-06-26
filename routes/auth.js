const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  // validate users input

  const { error } = validateAuth(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // validate system

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid Email or Password");
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(400).send("Invalid Email or Password");
  }

  // process

  req.session.user = user;
  req.session.isAuth = true;

  // response
  res.send("succeed");
});

function validateAuth(user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  });

  return schema.validate(user);
}

module.exports = router;
