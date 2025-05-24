// models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  authorId: String,
  content: String,
  timestamp: Date,
  channelId: String
});

module.exports = mongoose.model('Message', MessageSchema);
