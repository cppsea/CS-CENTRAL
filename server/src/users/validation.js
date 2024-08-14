const Joi = require('joi'); 

// Validation schemas
const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username should have a minimum length of 3',
    'string.max': 'Username should have a maximum length of 30'
  }),
  user_password: Joi.string().min(8).required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password should have a minimum length of 8'
  })
});

const userIdSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'ID must be an integer',
    'any.required': 'ID is required'
  })
});

const changeUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username should have a minimum length of 3',
    'string.max': 'Username should have a maximum length of 30'
  }),
  user_password: Joi.string().min(8).required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password should have a minimum length of 8'
  })
});

module.exports = {
  userSchema,
  userIdSchema,
  changeUserSchema
};
