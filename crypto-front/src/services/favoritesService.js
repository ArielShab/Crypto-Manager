import httpService from "./httpService";

export function addToFavorites(favoriteCoin) {
  return httpService.post("/favorites", favoriteCoin);
}

export function removeFromFavorites(favoriteCoin) {
  return httpService.delete(`/favorites/deleteCoin/${favoriteCoin}`);
}

export function getAllFavorites() {
  return httpService.get("/favorites/getAllFavorites");
}

const favoritesService = {
  addToFavorites,
  removeFromFavorites,
  getAllFavorites,
};

export default favoritesService;
