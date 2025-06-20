const Joi = require('joi');
const logger = require('../utils/logger');

const disasterSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  location_name: Joi.string().max(500).optional(),
  description: Joi.string().max(2000).required(),
  tags: Joi.array().items(Joi.string().max(50)).max(10).default([]),
  severity_level: Joi.number().integer().min(1).max(5).default(1)
});

const reportSchema = Joi.object({
  disaster_id: Joi.string().uuid().required(),
  content: Joi.string().min(1).max(1000).required(),
  report_type: Joi.string().valid('need', 'offer', 'alert', 'general').default('general'),
  priority_level: Joi.number().integer().min(1).max(5).default(1),
  image_url: Joi.string().uri().optional(),
  location_name: Joi.string().max(500).optional()
});

const resourceSchema = Joi.object({
  disaster_id: Joi.string().uuid().required(),
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(1000).optional(),
  location_name: Joi.string().max(500).optional(),
  resource_type: Joi.string().valid('shelter', 'medical', 'food', 'water', 'transportation', 'communication', 'other').required(),
  capacity: Joi.number().integer().min(0).optional(),
  contact_info: Joi.object().optional()
});

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      logger.warn(`Validation error: ${error.details[0].message}`);
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details[0].message
      });
    }
    req.validatedData = value;
    next();
  };
};

module.exports = {
  validateDisaster: validateRequest(disasterSchema),
  validateReport: validateRequest(reportSchema),
  validateResource: validateRequest(resourceSchema)
}; 