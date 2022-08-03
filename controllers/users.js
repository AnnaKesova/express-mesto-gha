const User = require('../models/user');
const {
  ERROR_CODE,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
} = require('../utils/errorCodes');

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.status).send({ message: ERROR_CODE.message });
        return;
      }
      res.status(ERROR_DEFAULT.status).send({ message: ERROR_DEFAULT.message });
    });
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.find({ _id: id })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND.status).send({ message: ERROR_NOT_FOUND.message });
        return;
      } res.send({ data: user });
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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, about })
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
  User.findByIdAndUpdate(id, { avatar })
    .then((user) => {
      res.send(user);
    })
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
