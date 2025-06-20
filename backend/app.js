const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
const rateLimitMiddleware = require('./middleware/rateLimit');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');
const geocodeRoutes = require('./routes/geocode');
const disasterRoutes = require('./routes/disasters');
const reportRoutes = require('./routes/reports');
const resourceRoutes = require('./routes/resources');
const socialMediaRoutes = require('./routes/socialMedia');
const officialUpdatesRoutes = require('./routes/officialUpdates');
const imageVerificationRoutes = require('./routes/imageVerification');
const socketHandlers = require('./websocket/socketHandlers');

// Placeholder for routes (to be implemented)
// const disasterRoutes = require('./routes/disasters');
// const reportRoutes = require('./routes/reports');
// const resourceRoutes = require('./routes/resources');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

// Logging
app.use(morgan('combined', {
  stream: { write: message => logger.info(message.trim()) }
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use('/api/', rateLimitMiddleware);

// Mock authentication (for demo)
app.use('/api/', authMiddleware);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes (to be added)
app.use('/api/v1/disasters', disasterRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/resources', resourceRoutes);
app.use('/api/v1/geocode', geocodeRoutes);
app.use('/api/v1/social-media', socialMediaRoutes);
app.use('/api/v1/official-updates', officialUpdatesRoutes);
app.use('/api/v1/verify-image', imageVerificationRoutes);

// Socket.IO setup (placeholder for handlers)
io.on('connection', (socket) => {
  logger.info(`WebSocket client connected: ${socket.id}`);
  socket.on('disconnect', () => {
    logger.info(`WebSocket client disconnected: ${socket.id}`);
  });
});

socketHandlers(io);

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.set('io', io);

module.exports = { app, server, io }; 