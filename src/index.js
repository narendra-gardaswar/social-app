const express = require("express");
const helmet = require("helmet");
const logger = require("./logger/logger");
const morgan = require("morgan");
require("dotenv").config();
const app = express();

const databaseConn = require("./utils/databaseConn");
const auth = require("./routes/auth");

/* Routes */
const user = require("./routes/user");
const post = require("./routes/post");

/* Middlewares */
app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/auth", auth);
app.use("/user", user);
app.use("/post", post);

/* Ping Route */
app.get("/ping", (req, res, next) => {
  res.status(200).json({ message: "Server is running Properly!" });
});

/* Error Handling */
app.use((req, res, next) => {
  const error = new Error("No Route Found");
  return res.status(400).json({ message: error.message });
});

/* Starting Server */
try {
  const startServer = async () => {
    await databaseConn();
    app.listen(process.env.SERVER_PORT || 5050, () => {
      logger.info(
        `Server Listening on Port ${process.env.SERVER_PORT || 5050}`
      );
      console.log(" ");
    });
  };
  startServer();
} catch (error) {
  logger.error(error.message, "Server Connection Failed, Server shutting down");
  process.exit(1);
}
