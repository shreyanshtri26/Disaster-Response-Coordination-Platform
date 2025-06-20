const express = require('express');
const router = express.Router();
const geocodeController = require('../controllers/geocodeController');

router.post('/', geocodeController.geocode);

module.exports = router; 