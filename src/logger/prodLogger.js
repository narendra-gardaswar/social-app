const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, json, ms, simple } = format;
require("winston-daily-rotate-file");
require("dotenv").config();

const productionLogger = () => {
  try {
    return createLogger({
      level: process.env.LOG_LEVEL || "debug",
      // defaultMeta: {
      //   service: "admin-service",
      // },
      format: combine(json(), timestamp({ format: "HH:mm:ss" })),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          filename: "./src/logs/combined-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          maxFiles: "14d",
        }),
        new transports.DailyRotateFile({
          filename: "./src/logs/error-%DATE%.log",
          level: "error",
          datePattern: "YYYY-MM-DD",
          maxFiles: "14d",
        }),
      ],
      // exceptionHandlers: [
      //   new transports.File({ filename: "../logs/exception.log" }),
      // ],
      // rejectionHandlers: [
      //   new transports.File({ filename: "../logs/rejections.log" }),
      // ],
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = productionLogger;
