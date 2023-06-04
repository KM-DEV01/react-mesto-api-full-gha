const { celebrate, Joi } = require('celebrate');
const { linkExp } = require('../consts/regex');

const signUpValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkExp),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const updateInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(linkExp).required(),
  }),
});

const idValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  signUpValidator,
  signInValidator,
  updateInfoValidator,
  updateAvatarValidator,
  idValidator,
};
