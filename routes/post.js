const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Post = mongoose.model('Post');

router.post('/createpost', requireLogin, async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: 'Please fill the required fields.' });
  }
  try {
    req.user.password = undefined;
    const post = new Post({
      title,
      body,
      postedBy: req.user,
    });
    const result = await post.save();
    res.json({
      post: result,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
