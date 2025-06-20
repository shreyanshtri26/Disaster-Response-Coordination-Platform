const supabaseService = require('../services/supabaseService');

exports.listDisasters = async (req, res, next) => {
  try {
    const disasters = await supabaseService.getDisasters(req.query);
    res.json(disasters);
  } catch (err) {
    next(err);
  }
};

exports.createDisaster = async (req, res, next) => {
  try {
    const disaster = await supabaseService.createDisaster({
      ...req.validatedData,
      owner_id: req.user.id
    });
    res.status(201).json(disaster);
  } catch (err) {
    next(err);
  }
};

exports.getDisasterById = async (req, res, next) => {
  try {
    const disaster = await supabaseService.getDisasterById(req.params.id);
    if (!disaster) return res.status(404).json({ error: 'Disaster not found' });
    res.json(disaster);
  } catch (err) {
    next(err);
  }
};

exports.updateDisaster = async (req, res, next) => {
  try {
    const updated = await supabaseService.updateDisaster(req.params.id, req.validatedData, req.user.id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteDisaster = async (req, res, next) => {
  try {
    await supabaseService.deleteDisaster(req.params.id, req.user.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}; 