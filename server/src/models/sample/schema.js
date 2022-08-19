
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ChatSchema = new Schema({
  userId: { type: String },
  text: { type: String, createdAt: { type: Date, default: Date.now, immutable: true }},
},
{ versionKey: false })

module.exports = mongoose.model('Chat', ChatSchema);

