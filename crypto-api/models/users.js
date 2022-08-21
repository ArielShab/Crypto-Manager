const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },

  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },

  gender: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function generateAuthToken() {
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
    },
    config.get("jwtKey")
  );
};

const User = mongoose.model("User", userSchema, "users");

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required(),
    gender: Joi.string().min(1).max(1),
  });

  return schema.validate(user);
}

module.exports = {
  User,
  validateUser,
};
