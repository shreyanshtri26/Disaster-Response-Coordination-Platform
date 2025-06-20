const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(err.stack || err.message || err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
}; 