const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const regEx = /(https?:\/\/)(w{3}\.)?([da-zA-Z-])\.([a-zA-Z]{2,6})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;

const {
  getUsers, getСurrentUser, getUserById, createUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/me', auth, getСurrentUser);
router.get('/:userId', auth, getUserById);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2).max(50),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required().pattern(regEx),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2).max(50),
    }),
  }),
  createUser,
);

router.patch(
  '/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

router.patch(
  '/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  updateAvatar,
);

module.exports = router;

// добавить защиту роутов
