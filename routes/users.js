const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getСurrentUser, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');

router.get(
  '/',
  getUsers,
);

router.get(
  '/me',
  getСurrentUser,
);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).required(),
    }),
  }),
  getUserById,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

router.patch(
  '/me/avatar',

  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  updateAvatar,
);

module.exports = router;
