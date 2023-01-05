const mongoose = require('mongoose');

const profile = new mongoose.Schema({
  id: { //_id есть в Монго
    type: String
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    minlength: 30,
  }
});

module.exports = mongoose.model('user', profile);

