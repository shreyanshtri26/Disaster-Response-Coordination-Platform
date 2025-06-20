const socialMediaService = require('../services/socialMediaService');

exports.getSocialMediaReports = async (req, res, next) => {
  try {
    const { disasterType, tag, location } = req.query;
    const posts = await socialMediaService.fetchReports({ disasterType, tag, location });
    res.json(posts);
  } catch (err) {
    next(err);
  }
}; 