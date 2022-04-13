const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, json } = format;
require("winston-daily-rotate-file");
require("dotenv").config();

const combinedFileTransport = new transports.DailyRotateFile({
  filename: "./src/logs/combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});
const errorFileTransport = new transports.DailyRotateFile({
  filename: "./src/logs/error-%DATE%.log",
  level: "error",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

const productionLogger = () => {
  return createLogger({
    level: process.env.LOG_LEVEL || "debug",
    // defaultMeta: {
    //   service: "admin-service",
    // },
    format: combine(timestamp(), json()),
    transports: [
      new transports.Console(),
      combinedFileTransport,
      errorFileTransport,
    ],
    // exceptionHandlers: [
    //   new transports.File({ filename: "../logs/exception.log" }),
    // ],
    // rejectionHandlers: [
    //   new transports.File({ filename: "../logs/rejections.log" }),
    // ],
  });
};

module.exports = productionLogger;
