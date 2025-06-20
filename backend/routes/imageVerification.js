const express = require('express');
const router = express.Router();
const imageVerificationController = require('../controllers/imageVerificationController');

// POST /api/v1/verify-image
router.post('/', imageVerificationController.verifyImage);

module.exports = router; 