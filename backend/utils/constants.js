const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line no-useless-escape
const regexUrl = /^https?:\/\/(www\.)?[a-zA-z\d\-]+\.[\w\d\-\._~:\/?#\[\]@!\$&'\(\)*\+,;=]{2,}#?$/;
const regexId = /^[a-z0-9]{24}$/i;

const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://api.mesto.irinavladi.nomoredomains.sbs',
  'https://api.mesto.irinavladi.nomoredomains.sbs',
  'http://mesto.irinavladi.nomoredomains.sbs',
  'https://mesto.irinavladi.nomoredomains.sbs',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateGetUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().pattern(regexId),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexUrl),
  }),
});

const validateGetCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().pattern(regexId),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regexUrl),
  }),
});

module.exports = {
  regexUrl,
  validateLogin,
  validateCreateUser,
  validateGetUserId,
  validateUpdateUser,
  validateUpdateAvatar,
  validateGetCardId,
  validateCreateCard,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
