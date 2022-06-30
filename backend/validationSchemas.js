const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.recipeSchema = Joi.object({
  title: Joi.string().required().escapeHTML(),
  description: Joi.string().required().escapeHTML(),
  ingredients: Joi.array().required(),
  nutritions: Joi.array().required(),
  instructions: Joi.string().required().escapeHTML(),
  category: Joi.string().required().escapeHTML(),
  time: Joi.number().required(),
  yields: Joi.string().required().escapeHTML(),
})

module.exports.userSchema = Joi.object({
  username: Joi.string().required().escapeHTML(),
  email: Joi.string().email().required().escapeHTML(),
  password: Joi.string().min(6).escapeHTML()
})