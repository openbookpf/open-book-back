const Joi = require("joi");

const createBookSchema = Joi.object({
  ISBN: Joi.number().integer().min(1).max(9999999999999).required(),

  book_title: Joi.string().min(0).max(255).required(),

  author: Joi.string().min(1).max(100).required(),

  book_cover_url: Joi.any(),

  genre: Joi.any(),

  book_description: Joi.string().min(1).max(2000).required(),

  price: Joi.number().precision(2).min(0).max(999999).required(),

  quantity: Joi.number().integer().min(0).max(9999),

  book_status: Joi.boolean(),
  editorial: Joi.any(),
  year_of_edition: Joi.any(),
  language: Joi.any(),
  age_segment: Joi.any(),
});

module.exports = createBookSchema;
