const Card = require('../models/card');
const NotFoundError = require('../utils/NotFoundError');
const BadRequestCode = require('../utils/BadRequestCode');
const ForbiddenError = require('../utils/ForbiddenError');

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => { next(err); });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const id = req.user._id;
  Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestCode('Переданы некорректные данные'));
      } else { next(err); }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пользователь не найден');
      }
      if (card.owner.toString() !== req.user._id) { throw new ForbiddenError('Чужую карточку нельзя удалить'); }
      return Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestCode('Переданы некорректные данные'));
      } else { next(err); }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestCode('Переданы некорректные данные'));
      } else { next(err); }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestCode('Переданы некорректные данные'));
      } else { next(err); }
    });
};
