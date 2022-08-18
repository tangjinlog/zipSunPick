
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ChatSchema = new Schema({
  userId: { type: String, required: true },
  text: { type: String, createdAt: { type: Date, default: Date.now, immutable: true }},
},
{ versionKey: false })

module.exports = mongoose.model('Chat', ChatSchema);
