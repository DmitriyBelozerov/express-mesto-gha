const Card = require('../models/card');

//ok
const getCards = (req, res) => {
  Card.find({})
    // .populate('owner')
    .then(
      (cards) => {
        if (!cards) {
          res.status(404).send({ message: 'Карточки не найдены' })
        } else {
          res.status(200).send({ data: cards })
        }
      })
    .catch((err) => res.status(500).send({ message: `Ошибка сервера: ${err}` }))
}

//ok
const createCard = (req, res) => {
  const { name, link } = req.body;
  console.log({ name, link, owner: req.user._id });
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => res.status(500).send({ message: `Ошибка сервера: ${err}` }))
}
//ok
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' })
      }
      res.status(200).send({ data: card })
    })


    .catch((err) => res.status(500).send({ message: `Ошибка сервера: ${err}` }))
}
//ok
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' })
      } else {
        res.status(200).send({ data: card })
      }
    })
    .catch((err) => res.status(500).send({ message: `Ошибка сервера: ${err}` }))
}
//ok
const deletelikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' })
      } else {
        res.status(200).send({ data: card })
      }
    })
    .catch((err) => res.status(500).send({ message: `Ошибка сервера: ${err}` }))
}

module.exports = { createCard, getCards, deleteCard, likeCard, deletelikeCard };