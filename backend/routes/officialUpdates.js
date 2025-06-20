const express = require('express');
const router = express.Router();
const officialUpdatesController = require('../controllers/officialUpdatesController');

// GET /api/v1/official-updates?disasterType=...&location=...
router.get('/', officialUpdatesController.getOfficialUpdates);

module.exports = router; 