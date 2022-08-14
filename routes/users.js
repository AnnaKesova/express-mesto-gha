const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUserById, updateUser, updateAvatarUser, getUserOne,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUser);
userRoutes.get('/me', getUserOne);
userRoutes.get('/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
}), getUserById);
userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
userRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(https|http)?:\/\/(www.)?[\w-._~:/?#[\]@!$&'()*+,;=]*#?/),
  }),
}), updateAvatarUser);

module.exports = userRoutes;
