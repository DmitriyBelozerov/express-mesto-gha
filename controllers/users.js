const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NO_ERRORS = 200;
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const AuthError = require('../errors/auth-err');
const UniqueEmailError = require('../errors/unique-email-err');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      } else {
        const token = jwt.sign(
          { _id: user._id },
          'secret-key',
          { expiresIn: '7d' },
        );
        res.status(NO_ERRORS).send({ token });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Неправильный формат логина или пароля'));
      } else {
        next(err);
      }
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        next(new NotFoundError('Запрашиваемые пользователи не найдены '));
      } else {
        res.status(NO_ERRORS).send({ data: users });
      }
    })
    .catch(next);
};

const getСurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Запрашиваемые пользователи не найдены '));
      } else {
        res.status(NO_ERRORS).send({ data: user });
      }
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    // .orFail(new Error('ValidError'))
    .then((user) => {
      res.status(NO_ERRORS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные при запросе пользователя'));
      } else if (err.message === 'ValidError') {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        res.status(NO_ERRORS).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new UniqueEmailError('Пользователь с таким Email уже существует'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    // .orFail(new Error())
    .then((user) => {
      res.status(NO_ERRORS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля пользователя'));
      } else if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь с указанным _id не найден'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Запрашиваемый пользователь не найден'));
      }
      res.status(NO_ERRORS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении аватара пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers, getСurrentUser, getUserById, createUser, updateUser, updateAvatar, login,
};
