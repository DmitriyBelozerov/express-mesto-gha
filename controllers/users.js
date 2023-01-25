const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NO_ERRORS = 200;
const ERROR_SERVER = 500;
const ERROR_NO_FOUND = 404;
const ERROR_VALIDATION = 400;
const ERROR_LOGGIN = 401;

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'secret-key',
        { expiresIn: '7d' },
      );
      res.status(NO_ERRORS).send({ token });
    })
    .catch((err) => {
      res.status(ERROR_LOGGIN).send({ message: err.message });
    });
};

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

const getСurrentUser = (req, res) => {
  const owner = req.user._id;
  res.status(ERROR_NO_FOUND).send({ owner });
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
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
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
  getUsers, getСurrentUser, getUserById, createUser, updateUser, updateAvatar, login,
};
