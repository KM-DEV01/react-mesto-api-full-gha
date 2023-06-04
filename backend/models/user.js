const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { linkExp } = require('../consts/regex');
const UnauthorizedError = require('../errors/unauth-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => linkExp.test(v),
      message: (props) => `${props.value} некорректный URL!`,
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Поле "email" должно быть валидным email-адресом',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static('findUserByCredentials', function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new UnauthorizedError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((match) => {
        if (!match) {
          throw new UnauthorizedError('Неправильные почта или пароль');
        }
        return user;
      }));
});

module.exports = mongoose.model('user', userSchema);
