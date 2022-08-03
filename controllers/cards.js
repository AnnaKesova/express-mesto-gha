const Card = require('../models/card');
const {
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
} = require('../utils/utils');

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.status).send({ message: ERROR_CODE.message });
        return;
      }
      res.status(ERROR_DEFAULT.status).send({ message: ERROR_DEFAULT.message });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;
  Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE.status)
          .send({ message: ERROR_CODE.message });
        return;
      }
      res.status(ERROR_DEFAULT.status).send({ message: ERROR_DEFAULT.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.params.cardId;
  Card.findByIdAndRemove(id)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.status).send({ message: ERROR_CODE.message });
        return;
      }
      res.status(ERROR_DEFAULT.status).send({ message: ERROR_DEFAULT.message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_NOT_FOUND.status)
          .send({ message: ERROR_NOT_FOUND.message });
        return;
      }
      res.status(ERROR_DEFAULT.status).send({ message: ERROR_DEFAULT.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_NOT_FOUND.status)
          .send({ message: ERROR_NOT_FOUND.message });
        return;
      }
      res.status(ERROR_DEFAULT.status).send({ message: ERROR_DEFAULT.message });
    });
};
