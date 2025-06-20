const logger = require('../utils/logger');

const MOCK_USERS = {
  'netrunnerX': { id: 'netrunnerX', role: 'admin', name: 'NetRunner X' },
  'reliefAdmin': { id: 'reliefAdmin', role: 'admin', name: 'Relief Admin' },
  'citizen1': { id: 'citizen1', role: 'contributor', name: 'Citizen One' },
  'responder1': { id: 'responder1', role: 'responder', name: 'First Responder' }
};

module.exports = (req, res, next) => {
  const userId = req.headers['x-user-id'] || 'citizen1';
  const user = MOCK_USERS[userId];
  if (!user) {
    return res.status(401).json({ error: 'Invalid user' });
  }
  req.user = user;
  logger.info(`Request from user: ${user.name} (${user.role})`);
  next();
}; 