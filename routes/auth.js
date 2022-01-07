const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../keys');
const jwt = require('jsonwebtoken');
const requireLogin = require('../middlewares/requireLogin');

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({
      error: 'Please fill the required fields.',
    });
  }
  try {
    const savedUser = await User.findOne({ email });
    if (savedUser) {
      return res
        .status(422)
        .json({ error: 'User already exists with this email.' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    if (hashedPassword) {
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();
      res.json({ message: 'Registered Successfully.' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(422)
        .json({ error: 'Please provide required credentials.' });
    }
    const savedUser = await User.findOne({ email });
    if (!savedUser) {
      return res.status(422).json({ error: 'Invalid Email or Password.' });
    }
    const doMatch = await bcrypt.compare(password, savedUser.password);
    if (doMatch) {
      // res.json({ message: 'Signed In Successfully' });
      const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
      res.json({ token });
    } else {
      return res.status(422).json({ error: 'Invalid Email or Password.' });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
