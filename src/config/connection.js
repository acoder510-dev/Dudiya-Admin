import mongoose from "mongoose";
import logger from "../utils/logger.js";
import config from "./config.js";

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_URI = `${config.MONGODB_URI}/${config.MONGODB_DB_MAIN}`;
// const MONGO_URI = `${config.MONGODB_URI}`;

export const db = mongoose.createConnection(MONGO_URI, connectOptions);

export default () => {
  // handlers
  db.on("connecting", () => {
    console.log("\x1b[32m", "MongoDB :: connecting");
  });

  db.on("error", (error) => {
    logger.log("info", "MongoDB :: connection" + error);
    console.log("\x1b[31m", "MongoDB :: connection" + error);
    mongoose.disconnect();
  });

  db.on("connected", () => {
    logger.log("info", "Mongodb :: connected");
    console.log("\x1b[35m" + "MongoDB :: connected", "\x1b[0m");
  });

  db.on("disconnected", () => {
    logger.log("info", "Mongodb :: disconnected");
    console.log("\x1b[31m", "MongoDB :: disconnected");
  });
};
