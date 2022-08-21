const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const favoritesRouter = require("./routes/favorites");

mongoose
  .connect("mongodb://localhost/crypto_users")
  .then(() => console.log("Connect to db"))
  .catch((err) => console.log("Could not connect to db", err));

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/favorites", favoritesRouter);

const PORT = 3900;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
