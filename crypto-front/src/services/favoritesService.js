import httpService from "./httpService";

// add coin to favorites

export function addToFavorites(favoriteCoin) {
  return httpService.post("/favorites", favoriteCoin);
}

// remove coin from favorites

export function removeFromFavorites(favoriteCoin) {
  return httpService.delete(`/favorites/deleteCoin/${favoriteCoin}`);
}

// get all favorites coin symbol from database

export function getAllFavorites() {
  return httpService.get("/favorites/getAllFavorites");
}

const favoritesService = {
  addToFavorites,
  removeFromFavorites,
  getAllFavorites,
};

export default favoritesService;
