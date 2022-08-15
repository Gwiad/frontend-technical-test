const path = require('path');
const db = require(`${path.dirname(__filename)}/../db.json`);

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  if (/messages/.test(req.url) && req.method === 'POST') {
    const { conversationId } = req.query;
  }

  next();
};
