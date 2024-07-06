import { connect, set } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

const connection = async () => {
  try {
    set("strictQuery", true);
    await connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("App connected to database ✔");
  } catch (err) {
    console.log(err);
  }
};

export default connection;
