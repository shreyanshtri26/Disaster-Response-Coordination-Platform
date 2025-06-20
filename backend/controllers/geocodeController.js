const { geocodeLocation } = require('../services/mappingService');

async function geocode(req, res) {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ error: 'Location query parameter is required.' });
    }
    const coords = await geocodeLocation(location);
    res.json(coords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { geocode }; 