import dotenv from "dotenv";
dotenv.config();

import winston from "winston";
import { ContextManager } from "../ContextModule/Context.js";
import { PapertrailConnection, PapertrailTransport } from "winston-papertrail";

const papertrailConnection = new PapertrailConnection({
  host: process.env.PAPERTRAIL_HOST,
  port: process.env.PAPERTRAIL_PORT,
});

papertrailConnection.on("error", function (err) {
  // Handle, report, or silently ignore connection errors and failures
});

export default class AppLogger {
  // Create a Papertrail Logger
  static logger = new winston.createLogger({
    transports: [
      // Local Console
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      }),

      // Papertrail
      new PapertrailTransport(papertrailConnection, {
        hostname: process.env.PAPERTRAIL_HOSTNAME,
        logFormat: function (level, message) {
          return `[${level}] ${message}`;
        },
      }),
    ],
  });

  static log(level, message) {
    const id = ContextManager.getLoggerId();
    const formattedMessage = `[${id}] ${message}`;
    AppLogger.logger.log(level, formattedMessage);
  }

  static info(message) {
    AppLogger.log("info", message);
  }

  static error(message) {
    AppLogger.log("error", message);
  }

  static warning(message) {
    AppLogger.log("warn", message);
  }
}
