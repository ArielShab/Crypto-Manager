const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 7,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema, "favorites");

module.exports = Favorite;
