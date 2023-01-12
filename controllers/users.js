const User = require('../models/user');
//ok
const getUsers = (req, res) => {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err))
}
//ok
const getUsersById = (req, res) => {
  return User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }
      return res.status(404).send({ message: "User not found" })
    })
    .catch((err) => res.status(500).send(err))
}
//ok
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send(err))
}

//ok
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true, })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send(err))
}
//ok
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send(err))
}



module.exports = { getUsers, getUsersById, createUser, updateUser, updateAvatar };