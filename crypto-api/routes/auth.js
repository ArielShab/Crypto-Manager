const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validateAuth(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    return res.status(400).send("Invalid email or password");
  }

  const token = user.generateAuthToken();

  res.send({ token });
});

function validateAuth(user) {
  return Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
  }).validate(user);
}

module.exports = router;
