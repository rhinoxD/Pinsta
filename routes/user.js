const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

router.get('/api/user/:id', requireLogin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    Post.find({ postedBy: req.params.id })
      .populate('postedBy', '_id name')
      .exec((error, posts) => {
        if (error) return res.status(422).json({ error });
        res.json({ user, posts });
      });
  } catch (error) {
    return res.status(404).json({ error: 'User not found' });
  }
});

router.put('/api/follow', requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    },
    (error, result) => {
      if (error) return res.status(422).json({ error });
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          return res.status(422).json({ error });
        });
    }
  );
});

router.put('/unfollow', requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (error, result) => {
      if (error) return res.status(422).json({ error });
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((error) => {
          return res.status(422).json({ error });
        });
    }
  );
});

router.put('/updatepic', requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (error, result) => {
      if (error) {
        return res.status(422).json({ error });
      }
      res.json(result);
    }
  );
});

router.post('/search-users', (req, res) => {
  let userPattern = new RegExp('^' + req.body.query);
  User.find({ email: { $regex: userPattern } })
    .select('_id email name')
    .then((user) => {
      res.json({ user });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
