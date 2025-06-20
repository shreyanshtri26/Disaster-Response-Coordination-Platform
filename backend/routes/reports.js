const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { validateReport } = require('../middleware/validation');

// List reports by disaster_id
router.get('/', reportController.listReports);

// Create new report
router.post('/', validateReport, reportController.createReport);

module.exports = router; 