const express = require('express');
const router = express.Router();
const disasterController = require('../controllers/disasterController');
const { validateDisaster } = require('../middleware/validation');

// List all disasters
router.get('/', disasterController.listDisasters);

// Create new disaster
router.post('/', validateDisaster, disasterController.createDisaster);

// Get specific disaster
router.get('/:id', disasterController.getDisasterById);

// Update disaster
router.put('/:id', validateDisaster, disasterController.updateDisaster);

// Delete disaster
router.delete('/:id', disasterController.deleteDisaster);

module.exports = router; 