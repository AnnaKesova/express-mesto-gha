const express = require('express');
const {
  getUser, getUserById, createUser, updateUser, updateAvatarUser,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUser);
userRoutes.get('/:userId', getUserById);
userRoutes.post('/', createUser);
userRoutes.patch('/me', updateUser);
userRoutes.patch('/me/avatar', updateAvatarUser);

module.exports = userRoutes;
