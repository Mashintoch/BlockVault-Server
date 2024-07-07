/* eslint-disable import/no-extraneous-dependencies */

const { createLogger, format, transports } = require("winston");
const mongoose = require("mongoose");
const { MongoDB } = require("winston-mongodb");
const dotenv = require("dotenv");

dotenv.config();

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const LogSchema = new mongoose.Schema({
  level: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", LogSchema);

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(), 
    new MongoDB({
      db: DB_URL,
      collection: "logs",
      options: { useNewUrlParser: true, useUnifiedTopology: true },
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
