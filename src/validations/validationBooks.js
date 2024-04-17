const Joi = require("@hapi/joi");

const bookSchema = Joi.object({
  ISBN: Joi.string().pattern(new RegExp("^[0-9-]+$")),
  book_title: Joi.string(),
  author: Joi.string(),
  book_cover_url: Joi.string(),
  genre: Joi.string(),
  book_description: Joi.string(),
  price: Joi.number(),
  quantity: Joi.number().integer(),
});

const userSchema = Joi.object({
  user_name: Joi.string().required(),
  email_adress: Joi.string().email().required(),
  phone_number: Joi.number().integer().required(),
  password: Joi.string().min(2).required(),
  user_type: Joi.string().required(),
  user_status: Joi.string().required(),
});

module.exports = {
  bookSchema,
  userSchema,
};
