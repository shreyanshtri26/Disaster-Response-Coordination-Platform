const { scrapeOfficialUpdates } = require('../services/webScrapingService');

async function getOfficialUpdates(req, res) {
  try {
    const { disasterType } = req.query;
    if (!disasterType) {
      return res.status(400).json({ error: 'disasterType query parameter is required.' });
    }
    const updates = await scrapeOfficialUpdates(disasterType);
    res.json(updates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getOfficialUpdates }; 