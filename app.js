const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const axios = require("axios");

const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session")(session);
const mongoURI = "mongodb://localhost/cryptoUsers";

const { getCoinsFromDB, removeZerosFromPrice } = require("./utilities/utils");

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const favoritesRouter = require("./routes/favorites");

mongoose
  .connect(mongoURI)
  .then(() => console.log("connecter to mongodb"))
  .catch((err) => console.log("could not connect to mongodb", err));

const store = mongoDBSession({
  uri: mongoURI,
  collection: "mySessions",
});

const app = express();
app.use(morgan("dev"));

app.use(express.json(), express.urlencoded({ extended: true }));

app.use(
  session({
    secret: config.get("cookieKey"),
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/favorites", favoritesRouter);

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("", (req, res) => {
  res.redirect("/index");
});

app.get("/index", (req, res) => {
  res.setHeader("Content-Type", "text/html");

  let user = req.session.user;

  if (user) {
    res.cookie("auth", req.session.isAuth);
    res.render("index", {
      logged: true,
      title: `Welcome ${
        user.firstName[0].toUpperCase() + user.firstName.slice(1)
      }`,
    });
  } else {
    if (res.cookie("auth")) {
      res.clearCookie("auth");
    }
    res.render("index", {
      logged: false,
      title: "Crypto Manager",
    });
  }
});

app.get("/coins", (req, res) => {
  res.setHeader("Content-Type", "text/html");

  let specificCoins = [];
  axios.get("https://api2.binance.com/api/v3/ticker/24hr").then((resp) => {
    let coins = resp.data;

    for (let currentCoin of coins) {
      let symbol = currentCoin.symbol;

      if (symbol.slice(symbol.length - 4) === "USDT") {
        specificCoins.push(currentCoin);
      }
    }

    for (let coin of specificCoins) {
      coin.lastPrice = removeZerosFromPrice(coin.lastPrice);
      coin.openPrice = removeZerosFromPrice(coin.openPrice);
      coin.highPrice = removeZerosFromPrice(coin.highPrice);
      coin.lowPrice = removeZerosFromPrice(coin.lowPrice);
      coin.priceChangePercent = removeZerosFromPrice(coin.priceChangePercent);
    }

    let user = req.session.user;

    if (user) {
      res.cookie("auth", req.session.isAuth);
      res.render("coins", {
        logged: true,
        data: specificCoins,
      });
    } else {
      if (res.cookie("auth")) {
        res.clearCookie("auth");
      }
      res.render("coins", {
        data: specificCoins,
        logged: false,
      });
    }
  });
});

app.get("/about", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  let user = req.session.user;

  if (user) {
    res.cookie("auth", req.session.isAuth);
    res.render("about", {
      logged: true,
    });
  } else {
    if (res.cookie("auth")) {
      res.clearCookie("auth");
    }
    res.render("about", {
      logged: false,
    });
  }
});

app.get("/registration", (req, res) => {
  if (req.session.isAuth) {
    res.redirect("/index");
  } else {
    res.setHeader("Content-Type", "text/html");
    res.render("registration");
  }
});

app.get("/login", (req, res) => {
  if (req.session.isAuth) {
    res.redirect("/index");
  } else {
    res.setHeader("Content-Type", "text/html");
    res.render("login");
  }
});

app.get("/favorites", (req, res) => {
  if (req.session.isAuth) {
    res.setHeader("Content-Type", "text/html");

    let specificCoins = [];
    getCoinsFromDB(req.session.user._id).then((DBcoins) => {
      if (!DBcoins.length) {
        res.render("favorites", {
          data: null,
        });
        return;
      }
      axios.get("https://api2.binance.com/api/v3/ticker/24hr").then((resp) => {
        let allCoins = resp.data;

        for (let currentCoin of allCoins) {
          let symbol = currentCoin.symbol;

          if (symbol.slice(symbol.length - 4) === "USDT") {
            for (let coin of DBcoins) {
              if (symbol.slice(0, symbol.length - 4) === coin.symbol) {
                specificCoins.push(currentCoin);
              }
            }
          }
        }
        for (let coin of specificCoins) {
          coin.lastPrice = removeZerosFromPrice(coin.lastPrice);
          coin.openPrice = removeZerosFromPrice(coin.openPrice);
          coin.highPrice = removeZerosFromPrice(coin.highPrice);
          coin.lowPrice = removeZerosFromPrice(coin.lowPrice);
          coin.priceChangePercent = removeZerosFromPrice(
            coin.priceChangePercent
          );
        }

        res.render("favorites", {
          data: specificCoins,
        });
      });
    });
  } else {
    res.redirect("/index");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
  });

  res.clearCookie("auth");
  res.redirect("/index");
});

app.use("/SCSS", (req, res) => {
  res.setHeader("Content-Type", "text/css");
  res.sendFile(path.resolve(__dirname, `.${req.baseUrl}${req.url}`));
});

app.use("/JavaScript", (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.sendFile(path.resolve(__dirname, `.${req.baseUrl}${req.url}`));
});

app.use("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.resolve(__dirname, "./views/pageNotFound.ejs"));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
