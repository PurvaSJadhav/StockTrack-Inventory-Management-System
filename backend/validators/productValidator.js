const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().trim(),
  price: Joi.number().positive().required(), 
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().trim().optional().allow('') 
});

module.exports = productSchema;