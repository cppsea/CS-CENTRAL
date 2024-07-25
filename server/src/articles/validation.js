const Joi = require('joi');

// Validation schemas
const articleSchema = Joi.object({
  title: Joi.string().min(3).max(255).required().messages({
    'any.required': 'Title is required',
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title should have a minimum length of 3',
    'string.max': 'Title should have a maximum length of 255'
  }),
  headers: Joi.array().items(Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required()
  })).required().messages({
    'any.required': 'Headers are required',
    'array.includesRequiredUnknowns': 'Each header must include title and body'
  })
});

const articleIdSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'ID must be an integer',
    'any.required': 'ID is required'
  })
});

module.exports = {
  articleSchema,
  articleIdSchema
};
