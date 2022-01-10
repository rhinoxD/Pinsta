const { JWT_SECRET } = require('../config/keys');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === Bearer wedsafgsdgfdsg
  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in.' });
  }
  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'You must be logged in.' });
    }
    try {
      const { _id } = payload;
      const userData = await User.findById(_id);
      req.user = userData;
      next();
    } catch (error) {
      console.log(error);
    }
  });
};
