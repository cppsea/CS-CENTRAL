const Joi = require('joi');

const profileSchema = Joi.object({
  first_name: Joi.string().min(1).max(50).optional().messages({
    'string.max': 'First name should have a maximum length of 50'
  }),
  last_name: Joi.string().min(1).max(50).optional().messages({
    'string.max': 'Last name should have a maximum length of 50'
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address'
  }),
  profile_pic: Joi.string().uri().optional().messages({
    'string.uri': 'Profile picture must be a valid URL'
  })
});

const profileIdSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'ID must be an integer',
    'any.required': 'ID is required'
  })
});

module.exports = {
  profileSchema,
  profileIdSchema
};
