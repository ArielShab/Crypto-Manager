import { removeZerosFromPrice } from "../services/CoinsServices";

const Tr = ({
  coin: {
    symbol,
    lastPrice,
    highPrice,
    lowPrice,
    openPrice,
    priceChangePercent,
  },
  index,
  addOrDeleteFavorite,
}) => {
  return (
    <tr>
      {window.innerWidth > 752 ? (
        <>
          <td>{index + 1}.</td>
          <td>{symbol}</td>
          <td>{removeZerosFromPrice(lastPrice)}</td>
          <td>{removeZerosFromPrice(highPrice)}</td>
          <td>{removeZerosFromPrice(lowPrice)}</td>
          <td>{removeZerosFromPrice(openPrice)}</td>
          <td>{removeZerosFromPrice(priceChangePercent)}</td>
          <td>
            <button
              id={symbol}
              className="btn btn-dark"
              onClick={addOrDeleteFavorite}
            >
              {addOrDeleteFavorite.name === "removeFromFavoritesFN" ? (
                <> Delete From Favorites</>
              ) : (
                <>Add To Favorites</>
              )}
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{symbol}</td>
          <td>{removeZerosFromPrice(lastPrice)}</td>
          <td>
            <button
              id={symbol}
              className="btn btn-dark"
              onClick={addOrDeleteFavorite}
            >
              {addOrDeleteFavorite.name === "removeFromFavoritesFN" ? (
                <> Delete From Favorites</>
              ) : (
                <>Add To Favorites</>
              )}
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default Tr;
