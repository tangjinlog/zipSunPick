const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
  id: {
    type: String,
    maxLength: 50,
    required: true,
    unique: 1
  },
  pw: {
    type: String,
    maxLength: 100,
    required: true
  },
  pwc: {
    type: String,
    maxLength: 100,
    required: true
  }
})

module.exports = mongoose.model('User', UserSchema);