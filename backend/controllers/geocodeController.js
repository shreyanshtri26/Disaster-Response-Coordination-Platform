const geocodingService = require('../services/geocodingService');

exports.geocode = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' });
    const geo = await geocodingService.geocodeLocation(text);
    res.json(geo);
  } catch (err) {
    next(err);
  }
}; 