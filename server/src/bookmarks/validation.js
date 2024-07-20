const Joi = require('joi');

// Validation schemas
const addBookmarkSchema = Joi.object({
  article_id: Joi.number().integer().required().messages({
    'any.required': 'Article ID is required',
    'number.base': 'Article ID must be an integer'
  })
});

const deleteBookmarkSchema = Joi.object({
  id: Joi.string().required().pattern(/^\d+(,\d+)*$/).messages({
    'any.required': 'Bookmark ID(s) are required',
    'string.pattern.base': 'Bookmark ID(s) must be a comma-separated list of integers'
  })
});

module.exports = {
  addBookmarkSchema,
  deleteBookmarkSchema
};
