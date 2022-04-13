const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, json } = format;
require("winston-daily-rotate-file");
require("dotenv").config();

const devLogger = () => {
  const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp}- ${level}- ${message}`;
  });
  return createLogger({
    level: process.env.LOG_LEVEL,
    format: combine(
      format.colorize(),
      timestamp({ format: "HH:mm:ss" }),
      myFormat
    ),
    transports: [new transports.Console()],
  });
};

module.exports = devLogger;
