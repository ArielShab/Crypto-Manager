const Favorite = require("../models/favorites");

async function getCoinsFromDB(id) {
  const allFavorites = await Favorite.find({
    user_id: id,
  });
  return allFavorites;
}

function removeZerosFromPrice(price) {
  for (let i = price.length; i > 0; i--) {
    if (price[i - 1] !== "0" && price[i - 1] !== ".") {
      return price.slice(0, i);
    }
  }
  return 0;
}


module.exports = { getCoinsFromDB, removeZerosFromPrice };
