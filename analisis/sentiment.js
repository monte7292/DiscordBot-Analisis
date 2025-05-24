// análisis/sentiment.js
const mongoose = require('mongoose');
const Sentiment = require('sentiment');
const Message = require('../models/Message');
require('dotenv').config();

const sentiment = new Sentiment();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const messages = await Message.find().limit(100);

  let positivos = 0, negativos = 0, neutrales = 0;

  messages.forEach(m => {
    const result = sentiment.analyze(m.content);
    if (result.score > 0) positivos++;
    else if (result.score < 0) negativos++;
    else neutrales++;
  });

  console.log('📊 Análisis de Sentimiento:');
  console.log(`✅ Positivos: ${positivos}`);
  console.log(`❌ Negativos: ${negativos}`);
  console.log(`➖ Neutrales: ${neutrales}`);
  process.exit();
})();
