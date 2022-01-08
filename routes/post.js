const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Post = mongoose.model('Post');

router.get('/allposts', requireLogin, async (req, res) => {
  try {
    const posts = await Post.find().populate('postedBy', '_id name');
    res.json({ posts });
  } catch (error) {
    console.log(error);
  }
});

router.get('/myposts', requireLogin, async (req, res) => {
  try {
    const myPosts = await Post.find({ postedBy: req.user._id }).populate(
      'postedBy',
      '_id name'
    );
    res.json({ myPosts });
  } catch (error) {
    console.log(error);
  }
});

router.post('/createpost', requireLogin, async (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({ error: 'Please fill the required fields.' });
  }
  try {
    req.user.password = undefined;
    const post = new Post({
      title,
      body,
      photo: pic,
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

router.put('/like', requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((error, result) => {
    if (error) {
      return res.status(422).json({ error });
    } else {
      res.json(result);
    }
  });
});

router.delete('/unlike', requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((error, result) => {
    if (error) {
      return res.status(422).json({ error });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
