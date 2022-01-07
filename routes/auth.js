const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({
      error: 'Please fill the required fields.',
    });
  }
  res.status(201).json({
    message: 'Registered.',
  });
});

module.exports = router;
