const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const httpError = require("http-errors");
const routes = require("./src/routes/index");
const errorHandler = require("./src/middlewares/ErrorHandler");
const config = require("./src/configs/app");
const connection = require("./src/configs/db");

const app = express();

const morganFormat = config.isDev ? "dev" : "combined";
app.use(morgan(morganFormat));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to BlockVault API",
  });
});

app.use("/api", routes);

app.use((req, res, next) => {
  next(httpError(404));
});

app.use(errorHandler);

(async function db() {
  await connection();
})();

app.listen(config.port, () => {
  console.log(`Server started ${config.host}:${config.port}`);
});
