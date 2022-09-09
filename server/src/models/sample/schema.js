
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const ChatSchema = new Schema({
  userId: { type: String },
  text: { 
    type: String,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  comment: [
    new Schema(
    {
      tpye: String,
      comment_id: ObjectId,
      comment_author: String,
      comment_text: String,
      comment_createdAt: { type: Date, default: Date.now, immutable: true },
    },
    {_id: false})
  ]
},
{ versionKey: false })

module.exports = mongoose.model('Chat', ChatSchema);

