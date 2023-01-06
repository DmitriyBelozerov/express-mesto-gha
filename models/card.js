const mongoose = require('mongoose');

const card = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    minlength: 30,
  },
  // link: {
  //   type: objectId,
  //   required: true,
  // },
  owner: {
    type: String,
    required: true,
  },
  // likes: { //по умолчанию — пустой массив (поле default)
  //   type: objectId,
  //   default: []
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', card);