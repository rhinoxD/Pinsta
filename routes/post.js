const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Post = mongoose.model('Post');

router.get('/api/allposts', requireLogin, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('postedBy', '_id name')
      .populate('comments.postedBy', '_id name')
      .sort('-createdAt');
    res.json({ posts });
  } catch (error) {
    console.log(error);
  }
});

router.get('/api/getsubpost', requireLogin, async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: { $in: req.user.following } })
      .populate('postedBy', '_id name')
      .populate('comments.postedBy', '_id name')
      .sort('-createdAt');
    res.json({ posts });
  } catch (error) {
    console.log(error);
  }
});

router.get('/api/myposts', requireLogin, async (req, res) => {
  try {
    const myPosts = await Post.find({ postedBy: req.user._id })
      .populate('postedBy', '_id name')
      .sort('-createdAt');
    res.json({ myPosts });
  } catch (error) {
    console.log(error);
  }
});

router.post('/api/createpost', requireLogin, async (req, res) => {
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
  )
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((error, result) => {
      if (error) {
        return res.status(422).json({ error });
      } else {
        res.json(result);
      }
    });
});

router.put('/unlike', requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((error, result) => {
      if (error) {
        return res.status(422).json({ error });
      } else {
        res.json(result);
      }
    });
});

router.put('/comment', requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((error, result) => {
      if (error) {
        return res.status(422).json({ error });
      } else {
        res.json(result);
      }
    });
});

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate('postedBy', '_id')
    .exec((error, post) => {
      if (error || !post) {
        return res.status(422).json({ error });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
});

// router.delete('/deletecomment/:commentId', requireLogin, (req, res) => {
//   Post.findOne({ comments: req.params.commentId })
//     .populate('postedBy', '_id')
//     .exec((error, comments) => {
//       if (error || !comments) {
//         return res.status(422).json({ error });
//       }
//       const com = comments.comments.map((comment) => {
//         return comment._id;
//       });
//       if (com.toString() !== req.params.commentId) {
//         comments
//           .remove()
//           .then((result) => {
//             res.json(result);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//     });
//   // res.status(200).json({ message: 'Comment Deleted Successfully' });
// });

// router.delete('/deletecomment/:postId/:commentId', requireLogin, (req, res) => {
//   Post.findByIdAndRemove(req.params.commentId).populate('postedBy', '_id');
//   res.status(200).json({ message: 'Comment Deleted Successfully' });
// });

module.exports = router;
