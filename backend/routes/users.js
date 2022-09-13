const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUserId,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const {
  validateCreateUser,
  validateGetUserId,
  validateUpdateUser,
  validateUpdateAvatar,
} = require('../utils/constants');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateGetUserId, getUserId);
router.post('/', validateCreateUser, createUser);
router.patch('/me', validateUpdateUser, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
