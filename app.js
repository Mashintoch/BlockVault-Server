import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import httpError from "http-errors";
import routes from "./src/routes";
import errorHandler from "./src/middlewares/ErrorHandler";
import config from "./src/configs/app";
import connection from "./src/configs/db";

const app = express();

const morganFormat = config.isDev ? "dev" : "combined";
app.use(morgan(morganFormat));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to BlockVault API"
  })
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
