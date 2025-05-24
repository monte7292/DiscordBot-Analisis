// messageLogger.js
const Message = require('./models/Message');
const cleanText = require('./utils/cleanText');

module.exports = async (message) => {
  if (message.author.bot) return;

  const content = cleanText(message.content);

  await Message.create({
    authorId: message.author.id,
    content,
    timestamp: message.createdAt,
    channelId: message.channel.id
  });

  console.log(`[MSG] ${message.author.username}: ${content}`);
};
