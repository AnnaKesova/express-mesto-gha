const express = require('express');
const {
  getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const cardRoutes = express.Router();

cardRoutes.get('/', getCard);
cardRoutes.post('/', createCard);
cardRoutes.delete('/:cardId', deleteCard);
cardRoutes.put('/:cardId/likes', likeCard);
cardRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = cardRoutes;
