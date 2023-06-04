const router = require('express').Router();
const {
  updateInfoValidator,
  updateAvatarValidator,
  idValidator,
} = require('../validators/user-validator');

const {
  getUserInfo,
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:id', idValidator, getUserById);

router.patch('/me', updateInfoValidator, updateUserInfo);
router.patch('/me/avatar', updateAvatarValidator, updateUserAvatar);

module.exports = router;
