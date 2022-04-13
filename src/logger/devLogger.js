const { createLogger, format, transports } = require("winston");
const {
  combine,
  timestamp,
  label,
  printf,
  json,
  prettyPrint,
  simple,
  colorize,
  splat,
  ms,
} = format;
require("winston-daily-rotate-file");
require("dotenv").config();

const devLogger = () => {
  try {
    const devFormat = printf(({ level, message, timestamp, ms }) => {
      return `${timestamp} - ${level} - ${ms} - ${message}`;
    });
    return createLogger({
      level: process.env.LOG_LEVEL,
      format: combine(
        colorize(),
        simple(),
        ms(),
        timestamp({ format: "HH:mm:ss" }),
        devFormat
      ),
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
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = devLogger;
