require("dotenv").config();
const devLogger = require("./devLogger");
const productionLogger = require("./prodLogger");

let logger = null;
if (process.env.LOG_NODE_ENV === "dev") {
  logger = devLogger();
}

if (process.env.LOG_NODE_ENV === "production") {
  logger = productionLogger();
}

module.exports = logger;
