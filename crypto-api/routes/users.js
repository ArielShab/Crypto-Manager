const express = require("express");
const router = express.Router();
const { validateUser, User } = require("../models/users");
const bcrypt = require("bcrypt");
const _ = require("lodash");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered");
  }

  user = await new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender ? req.body.gender : "3",
  });

  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(_.pick(user, ["id", "firstName", "email"]));
});

module.exports = router;
