const logger = require('../utils/logger');

module.exports = (io) => {
  io.on('connection', (socket) => {
    logger.info(`WebSocket client connected: ${socket.id}`);

    // Join a disaster-specific room
    socket.on('join_disaster', (disasterId) => {
      socket.join(`disaster_${disasterId}`);
      logger.info(`Client ${socket.id} joined disaster room: ${disasterId}`);
    });

    // Leave a disaster-specific room
    socket.on('leave_disaster', (disasterId) => {
      socket.leave(`disaster_${disasterId}`);
      logger.info(`Client ${socket.id} left disaster room: ${disasterId}`);
    });

    socket.on('disconnect', () => {
      logger.info(`WebSocket client disconnected: ${socket.id}`);
    });
  });
}; 