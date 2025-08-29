import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const transport = new transports.DailyRotateFile({
  filename: process.env.SERVER_LOG_FILE,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "50m",
  maxFiles: "7d",
  auditFile: "logs/audit.json",
  format: format.combine(
    format.timestamp({ format: process.env.LOG_DATE_FORMAT }),
    format.align(),
    format.printf(
      (info) => `${info.level}: ${[info.timestamp]} - ${info.message}`
    )
  ),
});

const logger = createLogger({
  transports: [transport],
});

export default logger;
