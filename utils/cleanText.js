// utils/cleanText.js
module.exports = (text) => {
    return text.toLowerCase().replace(/[^\w\s#]/gi, '').trim();
  };
  