import "../CSS/loading.css";

import { useEffect } from "react";
import { useState } from "react";
import Tr from "./tableRow";
import { getCoins } from "../services/CoinsServices";
import { useAuth } from "../context/auth.context";
import favoritesService from "../services/favoritesService";
import { toast } from "react-toastify";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [finishLoading, setFinishLoading] = useState(false);

  const { user } = useAuth();
  const { addToFavorites } = favoritesService;

  useEffect(() => {
    getCoins().then((data) => setCoins(data));
  }, []);

  if (!coins.length) {
    return (
      <div className="lds-dual-ring">
        <i className="bi bi-currency-bitcoin"></i>
      </div>
    );
  }

  const addToFavoritesFN = async (e) => {
    if (user) {
      try {
        const response = await addToFavorites({
          symbol: e.target.id,
        });
        toast.success(response.data + " !");
      } catch (e) {
        toast.error(e.response.data);
      }
    } else {
      toast.warn("Sign in first please");
    }
  };

  return (
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
              <th>Add To Favorites</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => {
              return (
                <Tr
                  key={coin.symbol}
                  coin={coin}
                  index={index}
                  addOrDeleteFavorite={addToFavoritesFN}
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
              <th>Add To Favorites</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => {
              return (
                <Tr
                  key={coin.symbol}
                  coin={coin}
                  index={index}
                  addOrDeleteFavorite={addToFavoritesFN}
                />
              );
            })}
          </tbody>
        </>
      )}
    </table>
  );
};

export default Coins;
