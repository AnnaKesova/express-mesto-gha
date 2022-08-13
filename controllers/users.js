const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user');
const {
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
} = require('../utils/utils');

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => {
      res.status(ERROR_DEFAULT.status).send({ message: ERROR_DEFAULT.message });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND.status).send({ message: ERROR_NOT_FOUND.message });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE.status).send({ message: ERROR_CODE.message });
        return;
      }
      res.status(ERROR_DEFAULT.status).send({ message: ERROR_DEFAULT.message });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
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

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
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

module.exports.updateAvatarUser = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
