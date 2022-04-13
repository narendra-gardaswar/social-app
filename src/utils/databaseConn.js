const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("../logger/logger");
module.exports = async () => {
  // logger.info(mongoose.connection.readyState); //logs 0
  mongoose.connection.on("connecting", () => {
    logger.info("Connecting to Database..");
  });
  // check database connection
  mongoose.connection.on("connected", async () => {
    logger.info("Database Connection Established");
  });
  mongoose.connection.on("disconnecting", () => {
    logger.warn("Disconnecting Database.."); // logs 3
  });
  mongoose.connection.on("disconnected", () => {
    logger.warn("Disconnected from Database.."); //logs 0
  });

  try {
    /** Database connection */
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: "majority",
    });
  } catch (error) {
    console.error(error, "Database Connection Failed, Server Shutting Down");
    process.exit(1);
  }
};
