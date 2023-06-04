const router = require('express').Router();
const { cardModelValidator, idValidator } = require('../validators/card-validator');
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.post('/', cardModelValidator, createCard);
router.get('/', getCards);
router.delete('/:cardId', idValidator, deleteCard);
router.put('/:cardId/likes', idValidator, likeCard);
router.delete('/:cardId/likes', idValidator, dislikeCard);

module.exports = router;
