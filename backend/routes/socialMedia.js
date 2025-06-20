const express = require('express');
const router = express.Router();
const socialMediaController = require('../controllers/socialMediaController');

// GET /api/v1/social-media?disasterType=...&tag=...&location=...
router.get('/', socialMediaController.getSocialMediaReports);

module.exports = router; 