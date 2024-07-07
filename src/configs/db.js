const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

const connection = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("App connected to database ✔");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connection;
