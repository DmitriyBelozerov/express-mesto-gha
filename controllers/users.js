const User = require('../models/user');
//ok
const getUsers = (req, res) => {
  return User.find({})
    .then((users) => {
      if (!users) {
        res.status(404).send({ message: "Запрашиваемые пользователи не найдены" })
      } else {
        res.status(200).send({ data: users })
      }
    })
    .catch((err) => res.status(500).send({ message: `Ошибка сервера: ${err}` }))
}
//ok
const getUsersById = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Запрашиваемый пользователь не найден" })
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => res.status(500).send({ message: `Ошибка сервера: ${err}` }))
}
//ok
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: `Ошибка сервера: ${err}` }))
}

//ok
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true, })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Запрашиваемый пользователь не найден" })
      } else {
        res.status(200).send({ data: user });

      }
    })
    .catch((err) => res.status(500).send({ message: `Ошибка сервера: ${err}` }))
}
//ok
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Запрашиваемый пользователь не найден" })
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: `Ошибка сервера: ${err}` }))
}



module.exports = { getUsers, getUsersById, createUser, updateUser, updateAvatar };