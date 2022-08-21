const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Favorite = require("../models/favorites");

router.post("/", auth, async (req, res) => {
  let favorite = await Favorite.findOne({
    symbol: req.body.symbol,
    user_id: req.user._id,
  });

  if (favorite) {
    return res.status(400).send("Coin is already in favorites");
  }

  favorite = await new Favorite({
    symbol: req.body.symbol,
    user_id: req.user._id,
  }).save();

  res.send("Coin added");
});

router.delete("/deleteCoin/:id", auth, async (req, res) => {
  console.log();
  let favorite = await Favorite.findOneAndDelete({
    symbol: req.params.id,
    user_id: req.user._id,
  });

  if (!favorite) {
    return res.status(400).send("Coin was already deleted");
  }

  res.send("Coin deleted");
});

router.get("/getAllFavorites", auth, async (req, res) => {
  const allFavorites = await Favorite.find({ user_id: req.user._id });

  res.send(allFavorites);
});

module.exports = router;
