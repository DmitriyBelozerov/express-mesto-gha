const router = require('express').Router();
const { getCards, createCard, deleteCard, likeCard, deletelikeCard } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', deletelikeCard);

module.exports = router;
