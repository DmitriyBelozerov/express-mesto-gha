const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    // .populate('owner')
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(400).send(err))
}



const createCard = (req, res) => {

  const { name, link } = req.body;

  console.log({ name, link, owner: req.user._id });
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => res.status(500).send(err))
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) =>
      res.status(200).send({ data: card })
    )
    .catch((err) => res.status(500).send(err))
}

module.exports = { createCard, getCards, deleteCard };