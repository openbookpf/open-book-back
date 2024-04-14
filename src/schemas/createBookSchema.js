const Joi = require('joi');

const createBookSchema = Joi.object({
  ISBN: Joi.number().integer().min(1).max(9999999999999).required(),

  book_title: Joi.string().length(255).required(),

  author: Joi.string().length(100).required(),

  book_cover_url: Joi.string().required(),

  genre: Joi.string().length(100).required(),

  book_description: Joi.string().length(2000).required(),

  price: Joi.number().precision(2).min(0).max(999999).required(),

  quantity: Joi.number().integer().min(0).max(9999).required(),

  book_status: Joi.boolean().required(),
});

module.exports = createBookSchema;
