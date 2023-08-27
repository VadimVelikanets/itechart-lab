import { format, createLogger, transports } from 'winston';

const { combine, timestamp, label, printf } = format;
const CATEGORY = 'winston custom format';

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
  transports: [
    new transports.File({
      filename: 'logs/app.log',
    }),
    new transports.File({
      level: 'error',
      filename: 'logs/error.log',
    }),
    new transports.Console(),
  ],
});

export default logger;
