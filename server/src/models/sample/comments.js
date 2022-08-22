const mongoose = require('mongoose');
const { Schema } = mongoose;

const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({

  commenter: {
    type: ObjectId,
    required: true,
    ref: 'Chat',
  },
  comment: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('Comment', commentSchema);