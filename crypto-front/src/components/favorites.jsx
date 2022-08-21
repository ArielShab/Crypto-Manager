import "../CSS/about.css";

import { useState, useEffect } from "react";
import { useAuth } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import {
  getAllFavorites,
  removeFromFavorites,
} from "../services/favoritesService";
import { toast } from "react-toastify";
import Tr from "./tableRow";
import { Link } from "react-router-dom";
import { getCoins } from "../services/CoinsServices";

const Favorites = () => {
  const refreshFavoritesCoins = async () => {
    const response = await getAllFavorites();
    const favoritesCoins = response.data;
    getCoins().then((allCoins) => {
      const chosenCoins = allCoins.filter((coin) => {
        for (let favoriteCoin of favoritesCoins) {
          if (coin.symbol === favoriteCoin.symbol) {
            return coin;
          }
        }
      });
      setFavoritesCoins(chosenCoins);
      setFinishLoading(true);
    });
  };

  const [favoritesCoins, setFavoritesCoins] = useState([]);
  const { user } = useAuth();
  const [finishLoading, setFinishLoading] = useState(false);

  useEffect(() => {
    refreshFavoritesCoins();
  }, []);

  const removeFromFavoritesFN = async (e) => {
    try {
      const response = await removeFromFavorites(e.target.id);
      toast.success(response.data);
      setFinishLoading(false);
    } catch (e) {
      toast.error(e.response.data);
    }
    refreshFavoritesCoins();
  };

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return finishLoading ? (
    favoritesCoins.length ? (
      <table className="table table-hover container bg-light text-center my-5">
        {window.innerWidth > 752 ? (
          <>
            <thead>
              <tr>
                <th>#</th>
                <th>Symbol</th>
                <th>Price $</th>
                <th>High Price $</th>
                <th>Low Price $</th>
                <th>Open Price $</th>
                <th>Change %</th>
                <th>Delete From Favorites</th>
              </tr>
            </thead>
            <tbody>
              {favoritesCoins.map((coin, index) => {
                return (
                  <Tr
                    key={coin.symbol}
                    coin={coin}
                    index={index}
                    addOrDeleteFavorite={removeFromFavoritesFN}
                  />
                );
              })}
            </tbody>
          </>
        ) : (
          <>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Price $</th>
                <th>Delete From Favorites</th>
              </tr>
            </thead>
            <tbody>
              {favoritesCoins.map((coin, index) => {
                return (
                  <Tr
                    key={coin.symbol}
                    coin={coin}
                    index={index}
                    addOrDeleteFavorite={removeFromFavoritesFN}
                  />
                );
              })}
            </tbody>
          </>
        )}
      </table>
    ) : (
      <div className="text-center mt-3 ">
        <h1 className="text-light">No coins in favorites😕</h1>
        <Link className="text-light" to="/coins">
          Let's add some coins now...
        </Link>
      </div>
    )
  ) : (
    <div className="lds-dual-ring">
      <i className="bi bi-currency-bitcoin"></i>
    </div>
  );
};

export default Favorites;
