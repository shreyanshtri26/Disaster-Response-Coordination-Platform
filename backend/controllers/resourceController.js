const supabaseService = require('../services/supabaseService');

exports.listResources = async (req, res, next) => {
  try {
    const { disaster_id, lat, lng, radiusKm } = req.query;
    if (lat && lng) {
      // Geospatial query
      const resources = await supabaseService.getNearbyResources(parseFloat(lat), parseFloat(lng), parseFloat(radiusKm) || 10, disaster_id);
      return res.json(resources);
    }
    // Optionally filter by disaster_id
    // (You can implement a getResourcesByDisaster if needed)
    res.status(400).json({ error: 'lat and lng are required for geospatial resource queries.' });
  } catch (err) {
    next(err);
  }
};

exports.createResource = async (req, res, next) => {
  try {
    const resource = await supabaseService.createResource(req.validatedData);
    res.status(201).json(resource);
  } catch (err) {
    next(err);
  }
}; 