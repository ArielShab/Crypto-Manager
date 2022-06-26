const express = require("express");
const router = express.Router();

const Favorite = require("../models/favorites");

router.post("/add", async (req, res) => {
  if (!req.session.user) {
    return res.status(400).send("Please login first");
  }

  let favoriteCoin = await Favorite.findOne({
    symbol: req.body.symbol,
    user_id: req.session.user._id,
  });

  if (favoriteCoin) {
    return res.status(400).send("Coin already in favorites");
  }

  favoriteCoin = await new Favorite({
    symbol: req.body.symbol,
    user_id: req.session.user._id,
  }).save();

  res.send("Coin added");
});

router.delete("/deleteOne", async (req, res) => {
  let favoriteCoin = await Favorite.findOneAndDelete({
    symbol: req.body.symbol,
    user_id: req.session.user._id,
  });

  if (!favoriteCoin) {
    return res.status(400).send("Coin was already deleted");
  }

  res.send("Coin deleted");
});

module.exports = router;
