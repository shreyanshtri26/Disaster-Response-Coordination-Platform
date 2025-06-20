const supabaseService = require('../services/supabaseService');

exports.listReports = async (req, res, next) => {
  try {
    const { disaster_id } = req.query;
    if (!disaster_id) return res.status(400).json({ error: 'disaster_id is required' });
    const reports = await supabaseService.getReportsByDisaster(disaster_id);
    res.json(reports);
  } catch (err) {
    next(err);
  }
};

exports.createReport = async (req, res, next) => {
  try {
    const report = await supabaseService.createReport({
      ...req.validatedData,
      user_id: req.user.id
    });
    if (req.app && req.app.get('io')) {
      req.app.get('io').emit('report_created', report);
    }
    res.status(201).json(report);
  } catch (err) {
    next(err);
  }
}; 