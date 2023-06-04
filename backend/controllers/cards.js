const Card = require('../models/card');

const ForbiddenError = require('../errors/forbidden-err');

const CREATED = 201;

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .orFail()
  .then((card) => {
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Чужая карточка!');
    }
    return card;
  })
  .then((card) => {
    Card.findByIdAndDelete(card._id)
      .orFail()
      .then(() => res.send({ message: 'Карточка удалена' }))
      .catch(next);
  })
  .catch(next);

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail()
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};
