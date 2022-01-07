const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

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

module.exports = router;
