const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getUsers, getСurrentUser, getUserById, createUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/me', auth, getСurrentUser);
router.get('/:userId', auth, getUserById);
router.post('/signin', login);
router.post('/signup', createUser);

router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateAvatar);

module.exports = router;
