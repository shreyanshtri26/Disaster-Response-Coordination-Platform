const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const { validateResource } = require('../middleware/validation');

// List resources (geospatial or by disaster)
router.get('/', resourceController.listResources);

// Create new resource
router.post('/', validateResource, resourceController.createResource);

module.exports = router; 