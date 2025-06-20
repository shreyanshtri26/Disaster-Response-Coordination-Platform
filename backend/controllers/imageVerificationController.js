const geminiService = require('../services/geminiService');

exports.verifyImage = async (req, res, next) => {
  try {
    const { imageUrl, disasterType } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'imageUrl is required' });
    const result = await geminiService.verifyDisasterImage(imageUrl, disasterType);
    res.json(result);
  } catch (err) {
    next(err);
  }
}; 