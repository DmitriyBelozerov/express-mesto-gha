const User = require('../models/user');

const NO_ERRORS = 200;
const ERROR_SERVER = 500;
const ERROR_NO_FOUND = 404;
const ERROR_VALIDATION = 400;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        res.status(ERROR_NO_FOUND).send({ message: ' Запрашиваемые пользователи не найдены ' });
      } else {
        res.status(NO_ERRORS).send({ data: users });
      }
    })
    .catch((err) => res.status(ERROR_SERVER).send({ message: `На сервере произошла ошибка: ${err}` }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('ValidError'))
    .then((user) => {
      res.status(NO_ERRORS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при запросе пользователя' });
      } else if (err.message === 'ValidError') {
        res.status(ERROR_NO_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(ERROR_SERVER).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(NO_ERRORS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(ERROR_SERVER).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error())
    .then((user) => {
      res.status(NO_ERRORS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при обновлении профиля пользователя' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_NO_FOUND).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(ERROR_SERVER).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NO_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      res.status(NO_ERRORS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при обновлении аватара пользователя' });
      } else {
        res.status(ERROR_SERVER).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

module.exports = {
  getUsers, getUserById, createUser, updateUser, updateAvatar,
};
