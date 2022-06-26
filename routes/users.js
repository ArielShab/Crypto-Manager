const express = require("express");
const router = express.Router();
const { validateUser, User } = require("../models/users");
const bcrypt = require("bcrypt");

const path = require("path");

router.post("/registration", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("user already registered");
  }

  user = await new User(req.body);

  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(path.resolve(__dirname, "../public/login.html"));
});

module.exports = router;
