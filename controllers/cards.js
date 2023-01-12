const Card = require('../models/card');

//ok
const getCards = (req, res) => {
  Card.find({})
    // .populate('owner')
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(400).send(err))
}

//ok
const createCard = (req, res) => {
  const { name, link } = req.body;
  console.log({ name, link, owner: req.user._id });
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => res.status(500).send(err))
}
//ok
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) =>
      res.status(200).send(card)
    )
    .catch((err) => res.status(500).send(err))
}
//ok
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) =>
      res.status(200).send(card)
    )
    .catch((err) => res.status(500).send(err))
}
//ok
const deletelikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) =>
      res.status(200).send(card)
    )
    .catch((err) => res.status(500).send(err))
}

module.exports = { createCard, getCards, deleteCard, likeCard, deletelikeCard };