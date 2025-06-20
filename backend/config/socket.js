const socketIo = require('socket.io');

function setupSocketIO(server) {
  const io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join_disaster_room', (disasterId) => {
      socket.join(`disaster:${disasterId}`);
      console.log(`Client ${socket.id} joined disaster room ${disasterId}`);
    });

    socket.on('leave_disaster_room', (disasterId) => {
      socket.leave(`disaster:${disasterId}`);
      console.log(`Client ${socket.id} left disaster room ${disasterId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}

module.exports = setupSocketIO; 