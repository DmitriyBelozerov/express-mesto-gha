const User = require('../models/user');

const getUsers = (req, res) => {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send(err))
}

const getUsersById = (req, res) => {
  return User.findOne({ id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User is not found" })
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(400).send(err))
}

const createUser = (req, res) => {
  // return User.countDocuments({ })
  // .then((id) => {
    // return
    User.create({
      // ...req.body, id
    })
    .then((user)=>{
      return res.status(200).send(user);
    })
  // })
  .catch((err) => res.status(400).send(err))
}

module.exports = { getUsers, getUsersById, createUser };