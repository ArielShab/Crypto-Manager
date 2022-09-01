// Get all the coins from the API and save only the coins with value in dollars

export const getCoins = async () => {
  const response = await fetch("https://api2.binance.com/api/v3/ticker/24hr");

  const allCoins = await response.json();
  const usdtCoins = [];

  for (let coin of allCoins) {
    const symbol = coin.symbol;
    if (symbol.slice(symbol.length - 4) === "USDT") {
      coin.symbol = symbol.slice(0, coin.symbol.length - 4);
      usdtCoins.push(coin);
    }
  }

  return usdtCoins;
};

// Remove all the number after the decimal point except of the first 2

export const removeZerosFromPrice = (price) => {
  for (let i = price.length; i > 0; i--) {
    if (price[i - 1] !== "0" && price[i - 1] !== ".") {
      return price.slice(0, i);
    }
  }
  return 0;
};

const CoinsService = {
  getCoins,
  removeZerosFromPrice,
};

export default CoinsService;
