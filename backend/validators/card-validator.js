const { celebrate, Joi } = require('celebrate');
const { linkExp } = require('../consts/regex');

const cardModelValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(linkExp).required(),
  }),
});

const idValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = { cardModelValidator, idValidator };
