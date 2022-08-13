const express = require('express');
const {
  getUser, getUserById, updateUser, updateAvatarUser, getUserOne,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUser);
userRoutes.get('/:userId', getUserById);
userRoutes.get('/me', getUserOne);
userRoutes.patch('/me', updateUser);
userRoutes.patch('/me/avatar', updateAvatarUser);

module.exports = userRoutes;
