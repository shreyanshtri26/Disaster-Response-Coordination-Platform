const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

const createRateLimiter = (options = {}) => {
  const defaultOptions = {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: { error: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
      res.status(429).json({ error: 'Too many requests, please try again later' });
    }
  };
  return rateLimit({ ...defaultOptions, ...options });
};

const generalLimiter = createRateLimiter();
const strictLimiter = createRateLimiter({ windowMs: 5 * 60 * 1000, max: 10 });

module.exports = generalLimiter;
module.exports.strictLimiter = strictLimiter; 