const router = require('express').Router();
const { auth, createUser, logout } = require('../controllers/users');
const { signUpValidator, signInValidator } = require('../validators/user-validator');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', signInValidator, auth);
router.post('/signup', signUpValidator, createUser);
router.post('/logout', logout);

router.use('/users', require('../middlewares/auth'), require('./users'));
router.use('/cards', require('../middlewares/auth'), require('./cards'));

router.use('*', (req, res, next) => next(new NotFoundError('Маршрут не найден')));

module.exports = router;
