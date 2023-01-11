const User = require('../models/user');

const getUsers = (req, res) => {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err))
}

const getUsersById = (req, res) => {
  return User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }
      return res.status(404).send({ message: "User not found" })
    })
    .catch((err) => res.status(500).send(err))
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send(err))
}


const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate({ name, about })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send(err))
}



module.exports = { getUsers, getUsersById, createUser, updateUser, updateAvatar };