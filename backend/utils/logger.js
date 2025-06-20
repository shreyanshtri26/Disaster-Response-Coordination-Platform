const winston = require('winston');
const { LOG_LEVEL } = require('../config/constants');

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

module.exports = logger; 