const mongoose = require('mongoose');
const { writeLog } = require('../utils/logWriter');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_ERROR = 500;

// eslint-disable-next-line no-unused-vars,consistent-return
module.exports = (err, req, res, next) => {
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(NOT_FOUND).send({ message: 'Запись не найдена' });
    return;
  }
  if (err instanceof mongoose.Error.CastError) {
    res.status(BAD_REQUEST).send({ message: 'Некорректный запрос.' });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(BAD_REQUEST).send({ message: 'Ошибка валидации' });
    return;
  }
  if (!err.statusCode) {
    writeLog(err);
    res.status(INTERNAL_ERROR).send({ message: 'Произошла ошибка сервера.' });
    return;
  }
  res.status(err.statusCode).send({ message: err.message });
};
