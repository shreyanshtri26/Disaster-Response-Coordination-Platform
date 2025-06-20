module.exports = {
  DEFAULT_CACHE_TTL_HOURS: parseInt(process.env.CACHE_TTL_HOURS) || 1,
  MOCK_SOCIAL_MEDIA_ENABLED: process.env.ENABLE_MOCK_SOCIAL_MEDIA === 'true',
  MOCK_DELAY_MS: parseInt(process.env.MOCK_DELAY_MS) || 1000,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
}; 