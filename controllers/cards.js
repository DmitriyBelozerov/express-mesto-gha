const Card = require('../models/card');

const NO_ERRORS = 200;
const ERROR_SERVER = 500;
const ERROR_NO_FOUND = 404;
const ERROR_VALIDATION = 400;

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        res.status(ERROR_NO_FOUND).send({ message: 'Карточки не найдены' });
      } else {
        res.status(NO_ERRORS).send({ data: cards });
      }
    })
    .catch((err) => res.status(ERROR_SERVER).send({ message: `На сервере произошла ошибка: ${err}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(NO_ERRORS).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_NO_FOUND).send({ message: 'Карточка не найдена' });
      }
      res.status(NO_ERRORS).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при удалении карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(ERROR_NO_FOUND).send({ message: `Карточка c данным ID: ${req.params.cardId} не найдена` });
      } else {
        res.status(NO_ERRORS).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при создании лайка карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

const deletelikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(ERROR_NO_FOUND).send({ message: `Карточка c данным ID: ${req.params.cardId} не найдена` });
      } else {
        res.status(NO_ERRORS).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные при удалении лайка карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: `На сервере произошла ошибка: ${err}` });
      }
    });
};

module.exports = {
  createCard, getCards, deleteCard, likeCard, deletelikeCard,
};
