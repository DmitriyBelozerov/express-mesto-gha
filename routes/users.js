const router = require('express').Router();
const { getUsers, getUsersById, createUser, updateUser, updateAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUsersById);
router.post('/', createUser);

router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);


module.exports = router;